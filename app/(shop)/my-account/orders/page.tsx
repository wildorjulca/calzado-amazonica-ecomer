import { getPedidosUser } from '@/src/actions/shop/my-account/order'
import { RotateCcw } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const OrdersPage = async () => {

  const response = await getPedidosUser()

  if (!response.ok) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <p className='text-red-500'>{response.message}</p>
      </div>
    )
  }

  if (response.orders?.length === 0) {
    return (
      <div className='h-full'>
        <h3 className='text-4xl'>Pedidos</h3>
        <div className='flex items-center justify-center w-full h-[60vh]'>
          <p className='text-2xl'>¡Usted todavía no tiene pedidos!</p>
        </div>
      </div>
    )
  }

  const { orders } = response

  return (
    <div className='w-full h-screen'>
      <h3 className='text-4xl'>Pedidos</h3>

      <div className='w-full mt-8'>
        {orders?.map((ped) => (
          <div
            key={ped.id}
            className='border border-gray-500 w-full mb-4'
          >
            {/* Header Pedido */}
            <div className='px-4 flex gap-5 w-full bg-gray-200 border-b border-gray-300 py-3'>
              <div className='flex justify-between w-full items-center'>
                <div className='flex gap-10'>
                  <div className='flex flex-col justify-center'>
                    <p>FECHA DEL PEDIDO</p>
                    <p className='font-semibold'>
                      {new Date(ped.fecha).toDateString()}
                    </p>
                  </div>

                  <div>
                    <p>TOTAL</p>
                    <p className='font-semibold'>
                      S/ {ped.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col items-end'>
                  <p>{ped.codigo_pedido}</p>
                  <span className='bg-yellow-500 text-white rounded-sm text-sm px-2 py-1'>
                    Aprobando el pago
                  </span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className='p-4 space-y-6'>
              {ped.item.map((item, index) => (
                <div key={index}>

                  <div className='flex w-full justify-between items-start gap-8'>

                    {/* Producto */}
                    <div className='flex gap-4 flex-1 min-w-0'>

                      {/* Imagen fija */}
                      <div className='w-[80px] h-[80px] shrink-0'>
                        <Image
                          className='bg-gray-100 border object-cover w-full h-full'
                          alt={item.nombre}
                          src={`/images/products/${item.url_imagen}`}
                          width={80}
                          height={80}
                        />
                      </div>

                      {/* Información */}
                      <div className='flex flex-col gap-2 flex-1 min-w-0'>
                        <div className='min-w-0'>
                          <h3 className='text-black font-semibold truncate'>
                            {item.nombre}
                          </h3>

                          <p className='text-sm break-words'>
                            {item.descripcion}
                          </p>
                        </div>

                        <div>
                          <p className='font-semibold text-sm'>
                            cantidad {item.cantidad} |
                            Talla: {item.talla} |
                            color: {item.color}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className='flex flex-col gap-3 w-[230px] shrink-0'>
                      <button className='flex items-center gap-3'>
                        <RotateCcw strokeWidth={1} />
                        <span>Hacer pedido de nuevo</span>
                      </button>

                      <button className='border-black border bg-gray-300 text-black w-full p-1'>
                        Ver detalles del pedido
                      </button>

                      <button className='border-black border bg-gray-600 text-white w-full p-1'>
                        Hacer un cambio o devolución
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage