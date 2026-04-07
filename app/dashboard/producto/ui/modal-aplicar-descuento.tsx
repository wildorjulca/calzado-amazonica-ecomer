'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Product } from "../interface/product.type";


interface Props {
    isOpen: boolean;
    onClose?: () => void;
    product: Product


}
const ModalAplicarDescuento = ({ isOpen, onClose, product }: Props) => {

    // if(!product) return null
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Aplicar descuento</DialogTitle>

                    {/* Producto */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Producto seleccionado
                        </label>
                        <div
                            className="bg-white border px-3 py-2 text-sm text-gray-900"
                            style={{ borderColor: '#8A8886', borderRadius: '2px' }}
                        >
                            <p className="font-medium">{product?.nombre || ""}</p>
                            <p className="text-xs text-gray-600 mt-0.5">
                                Precio actual: <span className="font-semibold text-gray-900">S/ {product?.precio_base_venta.toFixed(2) || ""}</span>
                            </p>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAplicarDescuento