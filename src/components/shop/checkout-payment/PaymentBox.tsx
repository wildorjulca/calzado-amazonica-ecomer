'use client'

export default function PaymentBox() {
    return (
        <div className="w-full">

            {/* TÍTULO */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Pago
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Todas las transacciones son seguras y están encriptadas.
                </p>
            </div>

            {/* MÉTODOS DE PAGO */}
            <div className="border border-black  border-gray-400 rounded-t-xl mt-2 bg-white">
                <div className="rounded-t-xl flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-200">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/payments/visa.svg"
                            alt="Visa"
                            className="h-6"
                        />
                        <img
                            src="/images/payments/mastercard.svg"
                            alt="Mastercard"
                            className="h-6"
                        />
                        <img
                            src="/images/payments/american-express.svg"
                            alt="American Express"
                            className="h-6"
                        />
                        <span className="text-xs text-gray-400 font-medium">
                            + otros
                        </span>
                    </div>

                    <span className="text-xs font-medium text-gray-500">
                        Culqi
                    </span>
                </div>

                {/* INFO */}
                <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    Se abrirá una ventana segura de Culqi para completar el pago.
                </div>
            </div>


        </div>
    )
}