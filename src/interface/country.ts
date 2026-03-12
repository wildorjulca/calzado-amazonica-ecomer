import { string } from "zod";



export interface Region {
    id: number;
    nombre: string;
}
export interface Provincia {
    id: number;
    nombre: string;
}
export interface Distrito {
    id: number;
    nombre: string;
}

export type AddressUser = {
  id: number
  nombres: string
  apellidos: string
  referencia: string | null
  telefono: string
  es_principal: boolean
  region: Region
  provincia: Provincia
  distrito:Distrito
}
