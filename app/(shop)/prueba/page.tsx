'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  CulqiSettings,
  CulqiClient,
  CulqiOptions,
  CulqiAppearance,
  PaymentMethods
} from '@/src/interface/culqui'

interface CulqiCheckoutProps {
  publicKey: string
  settings: CulqiSettings
  client: CulqiClient
  onTokenCreated: (token: string) => void
  onOrderCreated?: (order: any) => void
  onError?: (error: any) => void
}

declare global {
  interface Window {
    CulqiCheckout: any
    culqi: () => void
  }
}

const CulqiCheckout: React.FC<CulqiCheckoutProps> = ({
  publicKey,
  settings,
  client,
  onTokenCreated,
  onOrderCreated,
  onError
}) => {
  const culqiRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || isLoaded) return

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = reject
        document.body.appendChild(script)
      })

    const initCulqi = async () => {
      try {
        setIsLoading(true)

        // 🔑 Scripts obligatorios
        await loadScript('https://3ds.culqi.com')
        await loadScript('https://js.culqi.com/checkout-js')

        const paymentMethods: PaymentMethods = {
          tarjeta: true,
          yape: true,
          billetera: true,
          bancaMovil: true,
          agente: true,
          cuotealo: true,
        }

        const options: CulqiOptions = {
          lang: 'auto',
          installments: true,
          modal: true,
          container: '#culqi-container',
          paymentMethods,
          paymentMethodsSort: Object.keys(paymentMethods),
        }

        const appearance: CulqiAppearance = {
          theme: 'default',
          menuType: 'sidebar',
          buttonCardPayText: 'Pagar',
          defaultStyle: {
            bannerColor: '#3B82F6',
            buttonBackground: '#10B981',
            buttonTextColor: '#FFFFFF',
          },
        }

        const config = {
          settings,
          client,
          options,
          appearance,
        }

        culqiRef.current = new window.CulqiCheckout(publicKey, config)

        // ✅ CALLBACK CORRECTO
        window.culqi = function () {
          if (culqiRef.current?.token) {
            const token = culqiRef.current.token.id
            culqiRef.current.close()
            onTokenCreated(token)
          } else if (culqiRef.current?.order) {
            const order = culqiRef.current.order
            culqiRef.current.close()
            onOrderCreated?.(order)
          } else if (culqiRef.current?.error) {
            onError?.(culqiRef.current.error)
          }
        }

        setIsLoaded(true)
      } catch (err) {
        console.error('Error inicializando Culqi:', err)
        onError?.(err)
      } finally {
        setIsLoading(false)
      }
    }

    initCulqi()
  }, [publicKey, settings, client, isLoaded, onTokenCreated, onOrderCreated, onError])

  const openCheckout = () => {
    if (!isLoaded || !culqiRef.current) {
      onError?.({ message: 'Culqi no está listo' })
      return
    }
    culqiRef.current.open()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div id="culqi-container" className="min-h-[200px] mb-4">
        {isLoading && (
          <p className="text-center text-gray-500">
            Cargando sistema de pago...
          </p>
        )}
      </div>

      <button
        onClick={openCheckout}
        disabled={!isLoaded || isLoading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg"
      >
        {isLoading ? 'Cargando…' : 'Pagar con Culqi'}
      </button>
    </div>
  )
}

export default CulqiCheckout