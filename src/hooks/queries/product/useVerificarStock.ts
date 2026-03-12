import { VerificarStock } from "@/src/actions/shop/product/verificaStock";
import { useQuery } from "@tanstack/react-query";


export const useVerificarStock = (varianteId: number, quantity: number) => {
    const queryVerificarStock = useQuery({
        queryKey: ['verificar-stock', varianteId, quantity],
        queryFn: () => VerificarStock(varianteId, quantity),
        enabled: !!varianteId && !!quantity,
    })
    return queryVerificarStock
}