'use client'

import Lottie from "lottie-react"
import Link from 'next/link'
import animationData from "@/public/Success animation.json"
import { pedido_estado, pedido_estado_pago, pedido_metodo_pago } from "@/generated/prisma/enums"

// ===================================================
// TIPOS
// ===================================================
interface Prop {
    pedido: {
        id: number
        codido_pedido: string
        estado_pedido: pedido_estado | null
        estado_pago: pedido_estado_pago | null
        metodo_pago: pedido_metodo_pago | null
        total: number
        items: {
            id: number
            nombre: string
            descripcion: string | null
            subtotal: number
            cantidad: number
            color: string
            talla: string
            img: string
        }[]
    }
}

// ===================================================
// COMPONENTE
// ===================================================
export default function SuccessPayment({ pedido }: Prop) {

    // 🎯 Configuración de estados del pedido
    const estadoPedidoConfig = {
        pendiente: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendiente' },
        confirmado: { color: 'bg-blue-100 text-blue-700', label: 'Confirmado' },
        preparando: { color: 'bg-purple-100 text-purple-700', label: 'En preparación' },
        enviado: { color: 'bg-indigo-100 text-indigo-700', label: 'Enviado' },
        entregado: { color: 'bg-green-100 text-green-700', label: 'Entregado' },
        cancelado: { color: 'bg-red-100 text-red-700', label: 'Cancelado' },
    }[pedido.estado_pedido || 'pendiente']


    // 💳 Configuración de estados del pago
    const estadoPagoConfig = {
        pendiente: { color: 'bg-yellow-100 text-yellow-700', label: 'Pago pendiente' },
        pagado: { color: 'bg-green-100 text-green-700', label: 'Pago confirmado' },
        rechazado: { color: 'bg-red-100 text-red-700', label: 'Pago rechazado' },
        reembolsado: { color: 'bg-gray-100 text-gray-700', label: 'Reembolsado' },
    }[pedido.estado_pago || 'pendiente']

    // 💰 Configuración de método de pago
    const metodoPagoLabel = {
        tarjeta: 'Tarjeta de crédito/débito',
        yape: 'Yape',
        plin: 'Plin',
        transferencia: 'Transferencia bancaria',
        contra_entrega: 'Contra entrega',
        mercado_pago: 'Mercado Pago',
        paypal: 'PayPal',
    }[pedido.metodo_pago || 'tarjeta']

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-2xl mx-auto px-4">

                {/* ✅ Encabezado */}
                <div className="text-center mb-10 flex items-center justify-center flex-col">
                    <Lottie
                        animationData={animationData}
                        className="w-40"
                        loop={false}
                    />
                    <h1 className="text-3xl font-bold text-gray-900">¡Pedido Confirmado!</h1>
                    <p className="text-gray-600 mt-2">
                        Hemos recibido tu pedido correctamente
                    </p>
                </div>

                {/* 💳 Estado de Pago */}
                {pedido.estado_pago === 'pagado' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-green-900 mb-2">✅ Pago confirmado</h3>
                        <p className="text-sm text-green-800">
                            Tu pago fue procesado exitosamente. No es necesario realizar ningún pago adicional.
                        </p>
                    </div>
                )}

                {pedido.estado_pago === 'pendiente' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-yellow-900 mb-2">⏳ Pago pendiente</h3>
                        <p className="text-sm text-yellow-800">
                            Estamos procesando tu pago. Te notificaremos cuando se confirme.
                        </p>
                    </div>
                )}

                {pedido.estado_pago === 'rechazado' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-red-900 mb-2">❌ Pago rechazado</h3>
                        <p className="text-sm text-red-800">
                            Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
                        </p>
                    </div>
                )}

                {/* 🧾 Resumen del pedido */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Código de pedido:</span>
                            <span className="font-semibold">{pedido.codido_pedido}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Método de pago:</span>
                            <span className="font-semibold">{metodoPagoLabel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Estado del pedido:</span>
                            <span className={`text-sm px-3 py-1 rounded-full font-semibold ${estadoPedidoConfig.color}`}>
                                {estadoPedidoConfig.label}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Estado del pago:</span>
                            <span className={`text-sm px-3 py-1 rounded-full font-semibold ${estadoPagoConfig.color}`}>
                                {estadoPagoConfig.label}
                            </span>
                        </div>
                        <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between text-lg">
                                <span className="text-gray-900 font-semibold">Total:</span>
                                <span className="text-green-600 font-bold">
                                    S/ {pedido.total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📦 Productos */}
                {pedido.items && pedido.items.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Productos</h2>
                        <div className="space-y-4">
                            {pedido.items.map((item) => (
                                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                                    <img
                                        src={`/images/products/${item.img}`}
                                        alt={item.nombre}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">
                                            {item.nombre}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Color: {item.color} • Talla: {item.talla}
                                        </p>
                                        <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">
                                            S/ {item.subtotal.toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            S/ {(item.subtotal / item.cantidad).toFixed(2)} c/u
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 🚚 Seguimiento */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Seguimiento del pedido</h3>
                    <div className="space-y-4">
                        {['Pedido confirmado', 'En preparación', 'En camino', 'Entregado'].map((etapa, i) => {
                            const isActive =
                                (pedido.estado_pedido === 'confirmado' && i === 0) ||
                                (pedido.estado_pedido === 'preparando' && i <= 1) ||
                                (pedido.estado_pedido === 'enviado' && i <= 2) ||
                                (pedido.estado_pedido === 'entregado' && i <= 3)

                            return (
                                <div key={i} className="flex items-center">
                                    <div className={`w-8 h-8 ${isActive ? 'bg-green-600' : 'bg-gray-300'} rounded-full flex items-center justify-center mr-3`}>
                                        <span className="text-white text-sm">{i + 1}</span>
                                    </div>
                                    <div>
                                        <p className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {etapa}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 🔘 Acciones */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/my-account/orders"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Ver mis pedidos
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Seguir comprando
                    </Link>
                </div>

                {/* 📞 Contacto */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>
                        ¿Tienes alguna pregunta?{' '}
                        <a href="mailto:soporte@zuelaamazonica.com" className="text-blue-600 hover:underline">
                            Contáctanos
                        </a>
                    </p>
                    <p className="mt-1">
                        Teléfono: <span className="font-semibold">+51 999 555 123</span>
                    </p>
                </div>
            </div>
        </div>
    )
}