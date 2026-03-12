import { getOrderById } from '@/src/actions/shop/order/order'
import SuccessPayment from './ui/successPyament'

interface Props {
  searchParams: Promise<{
    orderId?: string
    isPayment?: string
  }>
}

const SuccessPage = async ({ searchParams }: Props) => {

  const params = await searchParams

  const orderId = Number(params.orderId)
  // const isPayment = params.isPayment

  const response = await getOrderById(orderId)

  if (!response?.ok) {
    return (
      <div>
        Error al cargar el pedido
      </div>

    )
  }

  return (
    <div>
      <SuccessPayment pedido={response?.pedido} />
    </div>
  )
}

export default SuccessPage