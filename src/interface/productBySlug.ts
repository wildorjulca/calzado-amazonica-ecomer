export interface Color {
  id: number;
  nombre: string;
  codigo_hex: string;
}


export interface ProductSlug {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;

  precio_base_venta: number;
  precio_descuento?: number;
  porcentaje_descuento?: number;
  en_oferta: boolean;

  coloresDisponibles: Color[];
}
