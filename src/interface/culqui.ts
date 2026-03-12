// Tipos base para Culqi Checkout (Next.js + TypeScript)

/* ===============================
   SETTINGS
================================ */
export interface CulqiSettings {
    title: string
    currency: 'PEN' | 'USD'
    amount: number // en centavos (ej: 1000 = S/10.00)
    description?: string
}

/* ===============================
   CLIENT
================================ */
export interface CulqiClient {
    email: string
    phone_number?: string
}

/* ===============================
   PAYMENT METHODS
================================ */
export interface PaymentMethods {
    tarjeta?: boolean
    yape?: boolean
    billetera?: boolean
    bancaMovil?: boolean
    agente?: boolean
    cuotealo?: boolean
}

/* ===============================
   OPTIONS
================================ */
export interface CulqiOptions {
    lang?: 'es' | 'en' | 'auto'
    installments?: boolean
    modal?: boolean
    container?: string
    paymentMethods?: PaymentMethods
    paymentMethodsSort?: string[]
}

/* ===============================
   APPEARANCE
================================ */
export interface CulqiAppearance {
    theme?: 'default' | 'dark'
    hiddenCulqiLogo?: boolean
    hiddenBannerContent?: boolean
    hiddenBanner?: boolean
    hiddenToolBarAmount?: boolean
    hiddenEmail?: boolean
    menuType?: 'sidebar' | 'tabs' 
    buttonCardPayText?: string
    logo?: string | null

    defaultStyle?: {
        bannerColor?: string
        buttonBackground?: string
        menuColor?: string
        linksColor?: string
        buttonTextColor?: string
        priceColor?: string
    }

    variables?: {
        fontFamily?: string
        fontWeightNormal?: string
        borderRadius?: string
        colorBackground?: string
        colorPrimary?: string
        colorPrimaryText?: string
        colorText?: string
        colorTextSecondary?: string
        colorTextPlaceholder?: string
        colorIconTab?: string
        colorLogo?: 'dark' | 'light'
    }
}

/* ===============================
   TOKEN RESPONSE
================================ */
export interface CulqiToken {
    id: string
    object: 'token'
    email: string
    type: 'card' | 'yape' | 'billetera'
    creation_date: number
}

/* ===============================
   ORDER RESPONSE
================================ */
export interface CulqiOrder {
    id: string
    object: 'order'
    amount: number
    currency: string
    status: string
    description?: string
}

/* ===============================
   ERROR
================================ */
export interface CulqiError {
    type: string
    code: string
    message: string
    merchant_message?: string
    user_message?: string
}