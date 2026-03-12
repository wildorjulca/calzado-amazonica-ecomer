import { AddressUser } from "@/src/interface/country"
import { motion } from "framer-motion";

interface Props {
    onClose?: () => void
    adressUser: AddressUser[]
}
const AdressLit = ({ adressUser, onClose }: Props) => {

    return (
        <motion.div
            key={"list-address"}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-4"
        >
            <div>
                <p className="text-sm mb-1">Selecciona una dirección para tu pedido:</p>
                <div className="space-y-4">
                    <h3 className="text-[17px] font-medium text-gray-900">
                        ENTREGA
                    </h3>
                    {adressUser?.map((address) => (
                        <div
                            key={address?.id}
                            className={`border rounded-md p-4 cursor-pointer transition-colors ${address.es_principal
                                ? 'border-[#000] border-1 bg-white'
                                : 'border-gray-300 hover:border-gray-400'
                                }`}
                        //    className={`border rounded-md p-4 cursor-pointer transition-colors ${selectedAddress?.id === address.id
                        // ? 'border-[#000] border-2 bg-white'
                        // : 'border-gray-300 hover:border-gray-400'
                        // }`}
                        // className={`border rounded-md p-4 cursor-pointer transition-colors`}
                        // onClick={() => onSelectAddress(address)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        {/* <span className="font-medium text-gray-900 text-[15px]">
                                        {address?.calle} {address?.numero}
                                    </span> */}
                                        {address.es_principal && (
                                            <span className="bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded">
                                                Predeterminada
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-[14px] leading-tight">
                                        {address?.region?.nombre},{address?.provincia?.nombre},{address?.distrito?.nombre},
                                    </p>
                                    <p className="text-gray-600 text-[14px] leading-tight">Telefono: {address.telefono}</p>
                                    {address.referencia && (
                                        <p className="text-gray-500 text-[13px] mt-1">
                                            {address.referencia}
                                        </p>
                                    )}

                                    {/* <p className="text-gray-600 text-[14px] leading-tight">Destinatario: {address.nombres} {address.apellidos}</p> */}
                                </div>
                                {/* {selectedAddress?.id === address?.id && (
                                <svg className="w-5 h-5 text-[#000]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )} */}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={onClose}
                        // onClick={onAddNewAddress}
                        className="w-full text-[14px] text-[#000] font-medium hover:text-gray-700 transition-colors py-2"
                    >
                        + Agregar nueva dirección
                    </button>
                </div>
            </div>
        </motion.div>

    )
}

export default AdressLit