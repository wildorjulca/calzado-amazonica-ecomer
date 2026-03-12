import { getUsersListAddress } from "@/src/actions/shop/address/adress"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"


export const useAddressList = () => {

    const { data: session } = useSession()

    const usuarioId = Number(session?.user?.id)

    const queryUser = useQuery({
        queryKey: ["user-list", usuarioId],
        queryFn: () => getUsersListAddress(usuarioId),
        refetchOnWindowFocus: false,
        retry: false,
    })
    return queryUser
}