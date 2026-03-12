import { getProductImagesByColor } from "@/src/actions/shop/products/getProductImagesByColor"
import { useQuery } from "@tanstack/react-query"


export const useProductImagesByColor = (producto_id: number, color_id: number) => {
    const queryProductImagesByColor = useQuery({
        queryKey: ['product-images-by-color', producto_id, color_id],
        queryFn: () => getProductImagesByColor({ producto_id, color_id }),
        enabled: !!producto_id && !!color_id,
        // keepPreviousData: true, // 🔥 evita parpadeo

    })
    return queryProductImagesByColor
}    
