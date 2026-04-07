

export type Product = {
    id: number;
    nombre: string;
    url_imagen: string;
    total_vendidos: number;
    marca: string | undefined;
    subcategoria: string;
    categoria: string;
    stock: number;
    estado: boolean;
    en_oferta: boolean;
    es_nuevo: boolean;
    precio_base_venta: number;
}
