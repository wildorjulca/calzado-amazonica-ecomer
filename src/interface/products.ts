

export interface Products {
    id: number;
    nombre: string;
    slug: string;
    descripcion: string | null;
    precio_base_venta: number;
    precio_descuento: number | null;
    porcentaje_descuento: number | null;
    en_oferta: boolean | null;
    producto_imagen: string[];
    colores: {
        id: number,
        nombre: string,
        codigo_hex: string
    }[],
    isFavorite: boolean
}