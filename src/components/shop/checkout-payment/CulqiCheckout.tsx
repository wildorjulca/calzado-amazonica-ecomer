'use client'

import { useEffect, useRef, useCallback } from 'react'

/* =====================================================
   1. TIPOS BASE DE CULQI
===================================================== */

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
    amount: number // EN CÉNTIMOS → 7990 = S/ 79.90
    order: string
    xculqirsaid: string
    rsapublickey: string
  }
  client: {
    email: string
  }
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
    menuType?: 'default' | 'sidebar' | 'sliderTop' | 'select',
    buttonCardPayText?: string
    logo?: string
    defaultStyle?: {
      bannerColor?: string
      buttonBackground?: string
      menuColor?: string
    }
  }
}

/* =====================================================
   2. COMPONENTE
===================================================== */

export default function CulqiCheckoutModal() {
  const culqiRef = useRef<CulqiInstance | null>(null)

  /* --------------------------------------------------
     3. INICIALIZAR CULQI (NO ABRE EL MODAL)
  -------------------------------------------------- */
  const initCulqi = useCallback(() => {
    if (!window.CulqiCheckout) return

    const config: CulqiConfig = {
      settings: {
        title: 'Zuela Amazonica',
        currency: 'PEN',
        amount: 7990, // S/ 79.90
        order: process.env.NEXT_PUBLIC_CULQI_ORDER_ID!,
        xculqirsaid: process.env.NEXT_PUBLIC_CULQI_RSA_ID!,
        rsapublickey: process.env.NEXT_PUBLIC_CULQI_RSA_PUBLIC_KEY!,
      },

      client: {
        email: 'cliente@correo.com',
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

      /* --------------------------------------------------
         APARIENCIA (SOLO DISEÑO)
      -------------------------------------------------- */
      appearance: {
        menuType: 'sliderTop', // sidebar | default | sliderTop | select
        // buttonCardPayText: 'Pagar S/ 79.90',
        logo: 'https://via.placeholder.com/150',
        defaultStyle: {
          //   bannerColor: '#1E40AF',
          //   buttonBackground: '#16A34A',
          //   menuColor: '#F3F4F6',
        },
      },
    }

    const instance = new window.CulqiCheckout(
      process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY!,
      config
    )

    /* --------------------------------------------------
       4. CALLBACK → CUANDO TERMINA EL FLUJO
    -------------------------------------------------- */
    instance.culqi = async function () {
      if (instance.token) {
        console.log('✅ TOKEN GENERADO:', instance.token.id)

        /**
         * AQUÍ:
         * 👉 envías el token a tu BACKEND
         * 👉 el backend cobra el dinero
         */
        // 3️⃣ Enviamos el token al BACKEND
        const response = await fetch('/api/culqi/charge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: instance.token.id,
            amount: 7990,
            currency_code: "PEN",
            email: 'cliente@correo.com',
          }),
        })

        const data = await response.json()
        console.log(data)

        instance.close()
      } else {
        console.error('❌ ERROR:', instance.error?.user_message)
      }
    }

    culqiRef.current = instance
  }, [])

  /* --------------------------------------------------
     0. CARGAR SCRIPTS DE CULQI
  -------------------------------------------------- */
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
      initCulqi()
    }

    start()
  }, [initCulqi])

  /* --------------------------------------------------
     5. BOTÓN PAGAR → ABRE EL MODAL
  -------------------------------------------------- */
  return (
    <button
      onClick={() => culqiRef.current?.open()}
      className="bg-green-600 text-white px-6 py-3 rounded-lg"
    >
      Pagar con Culqi
    </button>
  )
}