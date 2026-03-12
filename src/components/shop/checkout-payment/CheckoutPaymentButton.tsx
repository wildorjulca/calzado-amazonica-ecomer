'use client'

import animationData from "@/public/success.json"
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import Loader from '../../Loader'
import { CheckoutFormInputs } from '@/app/checkout-payment/page'
import { useCartStore } from '@/src/store'
import { placeToOrder } from '@/src/actions/shop/order/place-order'
import { CreditCard } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog'
import Lottie from 'lottie-react'
import { useRouter } from "next/navigation"

/* ===================================================== */
declare global {
    interface Window {
        CulqiCheckout: new (publicKey: string, config: CulqiConfig) => CulqiInstance
    }
}

interface CulqiInstance {
    token?: { id: string }
    error?: { user_message?: string }
    culqi: () => void
    open: () => void
    close: () => void
}

interface CulqiConfig {
    settings: {
        title: string
        currency: 'PEN' | 'USD'
        amount: number
        order: string
        xculqirsaid: string
        rsapublickey: string
    }
    client: { email: string }
    options: {
        lang: 'es' | 'en'
        modal: boolean
        installments: boolean
        paymentMethods: {
            tarjeta?: boolean
            yape?: boolean
            billetera?: boolean
            bancaMovil?: boolean
        }
        paymentMethodsSort: string[]
    }
    appearance?: {
        menuType?: 'default' | 'sidebar' | 'sliderTop' | 'select'
        logo?: string
    }
}

const CheckoutPaymentButton = () => {
    const router = useRouter()

    const [paymentSuccess, setPaymentSuccess] = useState(false) //??    Ete se activa el modal cuando el pago se iso correcto

    const { cart, resetCart } = useCartStore((state) => state)
    const [loading, setLoading] = useState(false)
    const [messageError, setMessageError] = useState<string | null>(null)
    const [orderCreated, setOrderCreated] = useState<{
        orderId: string
        email: string
        totalAmount: number
    } | null>(null)

    const culqiRef = useRef<CulqiInstance | null>(null)

    const { handleSubmit } = useFormContext<CheckoutFormInputs>()

    /* ===================================================== 
       PASO 0: CARGAR SCRIPTS DE CULQI (solo una vez)
    ===================================================== */
    useEffect(() => {
        const loadScript = (src: string) =>
            new Promise<void>((resolve) => {
                if (document.querySelector(`script[src="${src}"]`)) return resolve()
                const s = document.createElement('script')
                s.src = src
                s.async = true
                s.onload = () => resolve()
                document.body.appendChild(s)
            })

        const start = async () => {
            await loadScript('https://3ds.culqi.com')
            await loadScript('https://js.culqi.com/checkout-js')
        }

        start()
    }, [])

    /* ===================================================== 
       PASO 1: INICIALIZAR CULQI (prepara pero NO abre)
    ===================================================== */
    const initCulqi = useCallback((orderData: {
        orderId: string
        email: string
        totalAmount: number
    }) => {
        if (!window.CulqiCheckout) return

        const config: CulqiConfig = {
            settings: {
                title: 'Zuela Amazonica',
                currency: 'PEN',
                amount: orderData.totalAmount,
                order: orderData.orderId,
                xculqirsaid: process.env.NEXT_PUBLIC_CULQI_RSA_ID!,
                rsapublickey: process.env.NEXT_PUBLIC_CULQI_RSA_PUBLIC_KEY!,
            },
            client: {
                email: orderData.email,
            },
            options: {
                lang: 'es',
                modal: true,
                installments: false,
                paymentMethods: {
                    tarjeta: true,
                    yape: true,
                    billetera: true,
                    bancaMovil: true,

                },
                paymentMethodsSort: ['yape', 'tarjeta', 'billetera', 'bancaMovil'],
            },
            appearance: {
                menuType: 'sliderTop',
                logo: 'https://via.placeholder.com/150',
            },
        }

        const instance = new window.CulqiCheckout(
            process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY!,
            config
        )

        /* ===================================================== 
           CALLBACK: cuando termina el flujo (exitoso o error)
        ===================================================== */
        instance.culqi = async function () {
            if (instance.token) {
                console.log('✅ TOKEN GENERADO:', instance.token.id)

                /**
                 * AQUÍ:
                 * 👉 envías el token a tu BACKEND
                 * 👉 el backend cobra el dinero
                 */
                // 3️⃣ Enviamos el token al BACKEND
                try {
                    const response = await fetch('/api/culqi/charge', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            token: instance.token.id,
                            amount: orderData.totalAmount,
                            currency_code: 'PEN',
                            email: orderData.email,
                            orderId: orderData.orderId,
                        }),
                    })

                    const data = await response.json()
                    console.log(data)

                    if (data.ok) {
                        console.log('✅ Pago procesado exitosamente')
                        setMessageError(null)
                        setOrderCreated(null) // Limpiar estado
                        setPaymentSuccess(true)
                        resetCart()

                        instance.close()
                        // TODO: Redirigir a página de confirmación
                        setTimeout(() => {
                            router.push(`/success?orderId=${orderData.orderId}&isPayment=true`)
                        }, 2500)
                    } else {
                        setMessageError('Error al procesar el pago')
                    }
                } catch (error) {
                    console.error('❌ ERROR:', instance.error?.user_message)
                    console.error('❌ Error al procesar pago:', error)
                    setMessageError('Error al procesar el pago')
                } finally {
                    instance.close()
                }
            } else {
                console.error('❌ ERROR:', instance.error?.user_message)
                setMessageError(instance.error?.user_message || 'Error en el pago')
            }
        }

        culqiRef.current = instance
    }, [])

    /* ===================================================== 
       PASO 2: CREAR PEDIDO → guardar datos
    ===================================================== */
    const onSubmit = async (data: CheckoutFormInputs) => {
        setLoading(true)
        setMessageError(null)

        try {
            const productId = cart.map((prod) => ({
                variante_id: prod.varianteId,
                cantidad: prod.cantidad,
            }))

            const { region_id, provincia_id, ...rest } = data
            const res = await placeToOrder(rest, productId)

            if (!res.ok) {
                setMessageError(res.message)
                setLoading(false)
                return
            }

            console.log('✅ Pedido creado exitosamente')

            // Calcular total
            const totalAmount = cart.reduce(
                (sum, item) => sum + item.precio * item.cantidad,
                0
            ) * 100 // Convertir a céntimos

            const orderData = {
                orderId: String(res.orden?.id) ?? "0", // Debe venir de placeToOrder
                email: "jose@gmail.com",
                totalAmount,
            }

            // Guardar datos del pedido
            // setOrderCreated(orderData)
            setOrderCreated({
                email: "hh@gmail.com",
                orderId: String(res.orden?.id) ?? "0",
                totalAmount: totalAmount
            })

            // Inicializar Culqi
            // initCulqi(orderData)
            initCulqi(orderData)


            // Pequeño delay para asegurar que Culqi se inicializó
            setTimeout(() => {
                culqiRef.current?.open()
                setLoading(false)
            }, 300)

        } catch (error) {
            console.error(error)
            setMessageError('Error al procesar el pedido')
            setLoading(false)
        }
    }

    /* ===================================================== 
       PASO 3: REABRIR MODAL (si usuario lo cerró)
    ===================================================== */
    const handleReopenModal = () => {
        if (!orderCreated) return

        // Si ya existe instancia, solo abrir
        if (culqiRef.current) {
            culqiRef.current.open()
        } else {
            // Si no existe, reinicializar y abrir
            initCulqi(orderCreated)
            setTimeout(() => {
                culqiRef.current?.open()
            }, 300)
        }
    }

    return (
        <>

            {paymentSuccess && (
                <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50">
                    <div className="text-center animate-fadeIn">

                        <Lottie
                            animationData={animationData}
                            className="w-44 mx-auto"
                        />

                        <p className="font-semibold text-xl mt-4 text-white">
                            ¡Pago exitoso!
                        </p>

                        <p className="text-sm text-gray-200 mt-2 animate-pulse">
                            Redirigiendo a tu confirmación...
                        </p>
                    </div>
                </div>
            )}
            {/* <Dialog open={paymentSuccess}>
                <DialogContent showCloseButton={false} style={{ margin: 0, padding: 0 }} >
                    <Lottie
                        animationData={animationData}
                        className="w-full"
                        loop={false}
                    />
                  
                </DialogContent>
            </Dialog> */}
            {messageError && (
                <p className="text-sm text-red-600 text-center mb-2">{messageError}</p>
            )}

            {/* BOTÓN PRINCIPAL: Crear pedido y abrir Culqi */}
            {!orderCreated ? (
                <button
                    disabled={loading}
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className={clsx(
                        'w-full mt-4 py-3 rounded-md flex items-center justify-center transition-all duration-200',
                        'text-white font-semibold',
                        {
                            'bg-black hover:opacity-90 cursor-pointer': !loading,
                            'bg-neutral-800 opacity-80 cursor-not-allowed': loading,
                        }
                    )}
                >
                    {loading ? <Loader /> : 'Pagar ahora'}
                </button>
            ) : (
                /* BOTÓN SECUNDARIO: Reabrir modal si lo cerró */
                <div className="space-y-2">
                    <p className="text-sm text-center text-gray-600">
                        Tu pedido fue creado. Completa el pago:
                    </p>
                    <button
                        type="button"
                        onClick={handleReopenModal}
                        className="w-full  flex items-center justify-center gap-2 py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 hover:cursor-pointer"
                    >
                        Abrir método de pago <CreditCard />
                    </button>
                </div>
            )}
        </>
    )
}

export default CheckoutPaymentButton
// ```

// ---

// ## 🔄 **Flujo completo:**

// ### **Primera vez (crear pedido):**
// ```
// 1. Usuario clic en "Pagar ahora"
// 2. placeToOrder() crea pedido
// 3. Se guarda orderCreated con datos
// 4. initCulqi() prepara la instancia
// 5. culqiRef.current.open() abre el modal
// 6. Botón cambia a "Abrir método de pago"
//     ```

// ### **Si cierra el modal sin pagar:**
// ```
// 7. Modal se cierra
// 8. Usuario ve botón "Abrir método de pago"
// 9. Click en ese botón
// 10. handleReopenModal() ejecuta
// 11. culqiRef.current.open() reabre el modal
//     ```

// ### **Cuando paga exitosamente:**
// ```
// 12. instance.culqi() callback ejecuta
// 13. fetch('/api/culqi/charge') procesa
// 14. setOrderCreated(null) limpia estado
// 15. Botón vuelve a "Pagar ahora"