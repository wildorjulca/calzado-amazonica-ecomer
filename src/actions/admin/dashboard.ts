

// Total de clients

import { prisma } from "@/lib"

const getCountUser = async () => {
    try {
        const countUser = await prisma.usuario.count()
        return countUser
    } catch (error) {
        console.log("Error count user: ", error)
        throw new Error("Error al obtener la cantidad de Usuario")
    }

}

export const getAllDashboardStats = async () => {

    const [countUser] = await Promise.all([
        getCountUser()
    ])
    return {
        countUser
    }
}