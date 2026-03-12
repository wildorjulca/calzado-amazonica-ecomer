import { useForm } from "react-hook-form"


export interface FormInputs {
    nombre: string;
    slug: string;
    descripcion?: string;
    caracteristicas?: string;

    // atributos de precios
    precio_base_venta: number;
    precio_descuento?: number;
    porcentaje_descuento?: number;
    en_oferta?: boolean;

    // relaciones
    categoria_id: number;
    subcategoria_id: number;
    genero_id: number;
    marca_id?: number;

    // ...


    nuevo?: boolean,
    activo?: boolean

}

export const useProductFormRHF = () => {

    const formMethetod = useForm<FormInputs>({

    })

    return formMethetod
}