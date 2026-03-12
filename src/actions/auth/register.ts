'use server'

import { prisma } from "@/lib";
import bcryptjs from 'bcryptjs'

interface Props {
    nombre: string;
    apellido: string;
    email: string;
    password_hash: string;
}
export const registerUser = async ({ nombre, apellido, email, password_hash }: Props) => {
    try {
        const user = await prisma.usuario.create({
            data: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                password_hash: bcryptjs.hashSync(password_hash, 10),
                rol: "cliente"
            }
        })
        return {
            ok: true,
            user: user,
            message: "Usuario creado correctamente"
        }
    } catch (error) {
        console.log("error de registrar usuario", error)
        return {
            oke: false,
            message: "No se pudo crear el usuario"
        }
    }
}

