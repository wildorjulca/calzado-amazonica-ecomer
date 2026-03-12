import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartProduct = {
  id?: number
  varianteId: number
  nombre: string
  precio: number
  porcentaje_descuento?: number
  precio_descuento?: number
  en_oferta?: boolean
  cantidad: number
  imagen: string
  color: string
  talla: string
}

interface StoreCart {
  cart: CartProduct[]
  hasHydrated: boolean

  addProduct: (product: CartProduct) => void
  removeProduct: (varianteId: number) => void
  updateQuantity: (varianteId: number, quantity: number) => void
  resetCart: () => void

  setHasHydrated: (state: boolean) => void
}

export const useCartStore = create<StoreCart>()(
  persist(
    (set, get) => ({
      // 🔹 Estado inicial SIEMPRE definido
      cart: [],
      hasHydrated: false,

      // 🔹 Hidratación controlada
      setHasHydrated: (state) => set({ hasHydrated: state }),

      // 🔹 Agregar producto
      addProduct: (product) => {
        const cart = get().cart ?? []

        const existingProduct = cart.find(
          (p) => p.varianteId === product.varianteId
        )

        if (!existingProduct) {
          set({ cart: [...cart, product] })
          return
        }

        const updatedCart = cart.map((p) =>
          p.varianteId === product.varianteId
            ? { ...p, cantidad: product.cantidad }
            : p
        )

        set({ cart: updatedCart })
      },

      // 🔹 Eliminar producto
      removeProduct: (varianteId) => {
        const cart = get().cart ?? []
        set({
          cart: cart.filter((p) => p.varianteId !== varianteId),
        })
      },

      // 🔹 Actualizar cantidad
      updateQuantity: (varianteId, quantity) => {
        const cart = get().cart ?? []

        const updatedCart = cart.map((item) =>
          item.varianteId === varianteId
            ? { ...item, cantidad: quantity }
            : item
        )

        set({ cart: updatedCart })
      },

      // 🔹 Resetear carrito
      resetCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",

      // 🛡 SOLO persistimos cart
      partialize: (state) => ({
        cart: state.cart,
      }),

      // 🔥 Control profesional de hidratación
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)