import { NextResponse } from 'next/server'

export async function POST() {
    try {
        const auth = Buffer.from(
            '30049237:testpassword_D1G5dN9cqaPy41idFSMBkn3nP2syb8GQcYNBTsrdXNYFI'
        ).toString('base64')

        const response = await fetch(
            'https://api.micuentaweb.pe/api-payment/V4.1/Token/Create',
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 14900, // 👈 en centimos
                    currency: 'PEN',
                }),
            }
        )

        const data = await response.json()

        if (data.status !== 'SUCCESS') {
            return NextResponse.json(
                { error: 'Error creando token', data },
                { status: 400 }
            )
        }

        return NextResponse.json({
            token: data.answer.token,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error interno' },
            { status: 500 }
        )
    }
}
