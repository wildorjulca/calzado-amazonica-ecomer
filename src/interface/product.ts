

export interface Color {
    id: number;
    nombre: string;
    codigo_hex: string | null
}

export interface Tallas {
    variante_id: number;
    talla_id: number;
    talla_valor: string;
    precio_extra: number;
    stock: number | null;
}