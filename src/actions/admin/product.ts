
'use server'

import { prisma } from "@/lib"
import { getCategorias, getSubcategoriasPorCategoriaId } from "./category"
import { getColores } from "./color"
import { getTallas } from "./talla"
import { getMarcas } from "./marca"
import { getGeneros } from "./genero"

export const getProducts = async () => {
    try {
        const products = await prisma.producto.findMany({
            include: {
                producto_imagen: { take: 1 },
                marca: true,
                subcategoria: {
                    include: {
                        categoria: true
                    }
                },
                variante_producto: true
            }
        })

        const formattProducts = products.map((prod) => {

            const { producto_imagen, marca, subcategoria, variante_producto } = prod
            const url_imagen = producto_imagen[0].url_imagen
            const stok_total = variante_producto.reduce((acc, item) => acc + item.cantidad!, 0)

            return {
                id: prod.id,
                nombre: prod.nombre,
                url_imagen,
                total_vendidos: prod.total_vendidos!,
                marca: marca?.nombre,
                subcategoria: subcategoria.nombre,
                categoria: subcategoria.categoria.nombre,
                estado: prod.activo,
                stock: stok_total,
                en_oferta: prod.en_oferta,
                es_nuevo: prod.nuevo,
                precio_base_venta: Number(prod.precio_base_venta),

            }

        })

        return {
            ok: true,
            data: formattProducts
        }

    } catch (error) {
        console.log("Error de fecht de productos", error)
        return {
            ok: false,
            message: "Error al obtener los datos de los productos"
        }
    }
}

// para la page de editar del producto
export const getCatalogData = async () => {

    const [categorias, colores, tallas, marcas, generos] = await Promise.all(
        [
            getCategorias(),
            getColores(),
            getTallas(),
            getMarcas(),
            getGeneros()
            // getSubcategoriasPorCategoriaId()
        ]
    )

    return {
        categorias,
        colores,
        tallas,
        marcas,
        generos
    }


}