import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  res: NextApiResponse
) {
  // const { transactionId, orderNumber, amount } = await req.json()
  const { amount, currency, transactionId, customerEmail, orderId } = await req.json()



  console.log({ transactionId, orderId, amount })
  // const transactionId = `TX${Date.now()}`
  // const orderNumber = `ORD${Date.now()}`
  try {


    // 🔐 AUTH BASIC (storeId:testPassword)
    const auth = Buffer.from(
      '30049237:testpassword_D1G5dN9cqaPy41idFSMBkn3nP2syb8GQcYNBTsrdXNYFI'
    ).toString('base64')

    // Crear payload para Izipay
    const payload = {
      amount: amount, // en céntimos
      currency: currency, // "PEN" o "USD"
      orderId: `ORDER-${Date.now()}`,
      formAction: "PAYMENT",
      customer: {
        email: customerEmail,
        reference: "myCustomerRef-123",
        billingDetails: {
          firstName: "Juan",
          lastName: "Perez",
          address: "Av. Siempre Viva 123",
          city: "Lima",
          country: "PE",
          zipCode: "15001",
          phoneNumber: "987654321",
        },
      },
      metadata: {
        myCustomKey: "1234",
      },
    };

    const response = await fetch(
      'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    const data = await response.json()
    console.log(data)

    console.log('🟢 IZIPAY CREATE PAYMENT 👉', data)

    if (data.status !== 'SUCCESS') {
      return NextResponse.json(
        { error: 'Error creando pago', data },
        { status: 400 }
      )
    }

    // 🔑 ESTE ES EL TOKEN QUE QUIERE EL SDK
    // return NextResponse.json({
    //   token: data.answer.paymentToken,
    // })


    return NextResponse.json({
      token: data.answer.formToken, // ✅ CORRECTO
      transactionId,
      orderId: orderId
    })

  } catch (error) {
    console.error('🔥 IZIPAY ERROR 👉', error)
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    )
  }
}
