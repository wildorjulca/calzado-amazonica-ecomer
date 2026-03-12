// /api/culqi/charge/route.ts
import { prisma } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, amount, currency_code, email, orderId } = body;

        // ✅ Validar secret key
        const secretKey = process.env.CULQI_SECRET_KEY;
        if (!secretKey) {
            console.error("CULQI_SECRET_KEY no está configurada");
            return NextResponse.json(
                { ok: false, message: "Error de configuración del servidor" },
                { status: 500 }
            );
        }

        console.log("🔑 secretKey:", secretKey);
        console.log("📦 Request body:", body);

        // ✅ Llamar a Culqi API
        const response = await fetch("https://api.culqi.com/v2/charges", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                currency_code,
                email,
                source_id: token,
            }),
        });

        const data = await response.json();
        console.log(response.ok)
        console.log("📊 Respuesta de Culqi:", data);

        // ✅ Error en la respuesta de Culqi
        if (!response.ok) {
            return NextResponse.json(
                { ok: false, message: data.user_message || "Error al procesar el pago" },
                { status: 400 }
            );
        }

        // ✅ Pago rechazado
        if (data.outcome?.type !== 'venta_exitosa') {
            console.log('⚠️ Pago rechazado:', data.outcome);
            return NextResponse.json(
                { ok: false, message: data.outcome?.user_message || 'Pago rechazado' },
                { status: 400 }
            );
        }

        // ✅ Pago exitoso
        console.log('✅ PAGO EXITOSO:', data.reference_code);
        // console.log(data)

        // TODO: Actualizar estado del pedido en BD
        await prisma.pedido.update({
            where: { id: Number(orderId) },
            data: { estado_pago: "pagado" }
        })


        return NextResponse.json(
            {
                ok: true,
                message: 'Pago procesado exitosamente',
                chargeId: data.id,
                referenceCode: data.reference_code,
                authorizationCode: data.authorization_code,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ Error en el procesamiento del pago:", error);
        return NextResponse.json(
            { ok: false, message: "Error del servidor" },
            { status: 500 }
        );
    }
}
