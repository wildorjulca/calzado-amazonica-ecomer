import { getDistritoByProvinciaId } from "@/src/actions/shop/country/getDistrito"
import { getProvinciasByRegionId } from "@/src/actions/shop/country/getProvincia"
import { getRegion } from "@/src/actions/shop/country/getRegion"
import { useQuery } from "@tanstack/react-query"



export const useRegions = () => {
    const query = useQuery({
        queryKey: ["list-regiones"],
        queryFn: () => getRegion(),
        retry: false,
        refetchOnWindowFocus: false,
    })
    return query
}

export const useProvincias = (region_id?: number) => {

    const query = useQuery({
        queryKey: ["list-provincias", region_id],
        queryFn: () => getProvinciasByRegionId(region_id),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!region_id

    })

    return query
}

export const useDistritos = (provincia_id?: number) => {

    const query = useQuery({
        queryKey: ["list-distritos",provincia_id],
        queryFn: () => getDistritoByProvinciaId(provincia_id),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!provincia_id

    })

    return query
}