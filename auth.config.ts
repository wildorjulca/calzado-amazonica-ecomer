import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import Google from 'next-auth/providers/google'
import z from "zod";
import bcryptjs from 'bcryptjs'
import { prisma } from "./lib";

export default {
    callbacks: {
        // Este callback se ejecuta cuando el usuario hace sign in //!!(google)
        async signIn({ account, profile, user, }) {

            if (account?.provider === "google") {
                try {
                    // Verificar si el usuario ya existe cuando se autentique potr google para que no se guarde duplicado a la base de datos
                    const existengUser = await prisma.usuario.findUnique({
                        where: { email: user.email! }
                    })

                    if (!existengUser) {

                        const usuario = await prisma.usuario.create({
                            data: {
                                email: user.email!,
                                nombre: user.name!,
                            }
                        })

                        console.log("Usuario que se creo y retorno: ", usuario)
                    }
                    return true
                } catch (error) {
                    console.log("Error en el SignIn Callback con Google:", error)
                    return false
                }

            }

            return true
        },
        async jwt({ token, user, account }) {
            // console.log({ token, user, account})

            // Cuando el usuario hace login
            if (user?.email) {
                const dbUser = await prisma.usuario.findFirst({ where: { email: user?.email } })

                if (dbUser) {
                    token.id = String(dbUser.id)
                    token.name = dbUser.nombre
                    token.email = dbUser.email
                }
            }

            return token
        },
        session({ session, user, token }) {
            // session.user = token.data as typeof session.user
            // return session
            if (session?.user) {
                session.user.id = token.id as string
                session.user.name = token.name as string
                session.user.email = token.email as string
            }

            return session
        }
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

        Credentials({
            authorize: async (credentials, request) => {
                console.log("Credentials authorize - Validando credenciales");
                // let user = null

                // logic to salt and hash password
                // const pwHash = saltAndHashPassword(credentials.password)

                // logic to verify if the user exists
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(5) })
                    .safeParse(credentials);

                const { success, data, error } = parsedCredentials

                if (!success) {
                    console.log("Validacion Fallida: ", error)
                    return null
                }
                // user = await getUserFromDb(credentials.email, pwHash)
                const user = await prisma.usuario.findFirst({ where: { email: data.email } })

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    // throw new Error("Invalid credentials.")
                    return null
                }

                const passwordMatch = bcryptjs.compareSync(data.password, user.password_hash!)

                if (!passwordMatch) {
                    console.log("Contraseña incorrecta para:", data.email);
                    return null;
                }
                // return user object with their profile data
                return {
                    email: user.email,
                    name: user.nombre,
                    id: String(user.id),
                    image: "",
                }

            },

        }),

    ],
} satisfies NextAuthConfig