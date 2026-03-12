import { saveAddresUser } from "@/src/actions/shop/address/adress"
import { AddressUser } from "@/src/interface/country"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"




export const useSaveAddressMutation = (onClose?: () => void) => {

    const queryClient = useQueryClient()
    const { data: session } = useSession()

    const usuarioId = Number(session?.user?.id)


    const mutation = useMutation({
        mutationFn: saveAddresUser,
        onSuccess: (data, variables) => {

            //!!data   es la data que el servidor retorna
            //??  variables el la data que la funcion recibe  osea el saveAddresUser el payload or body

            queryClient.setQueryData<AddressUser[]>(
                ["user-list", usuarioId],
                (old) => {
                    if (!old) return [data]
                    return [...old, data]
                }
            )

            queryClient.invalidateQueries({ queryKey: ["user-list", usuarioId] })
            onClose?.()

        }

    })
    // console.log(mutation)

    return mutation


}