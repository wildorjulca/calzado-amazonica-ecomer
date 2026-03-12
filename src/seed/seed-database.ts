import { variante_producto } from "@/generated/prisma/client";
import { prisma } from "../../lib";
import { initialData } from "./seed";
import { initialCategorizacion } from "./seed-categorizacion";
import { initialCountrie } from "./seed-contries";
import bcryptjs from 'bcryptjs'
const main = async () => {

    // ELIMACION DEL LAS TABLAS DE FORMA  EN JERARQUICA

    await Promise.all([

        // 🔥 DEPENDEN DE detalle_pedido
        // prisma.detalle_devolucion.deleteMany(),

        // 🔥 DEPENDEN DE pedido
        // prisma.devolucion.deleteMany(),

        // 🔥 DEPENDEN DE variante_producto
        // prisma.carrito.deleteMany(),
        // prisma.historial_stock.deleteMany(),
        // prisma.resena.deleteMany(),

        // 🔥 DEPENDEN DE orden_compra
        // prisma.pago_proveedor.deleteMany(),

        // 🔥 DEPENDEN DE orden_compra y producto
        // prisma.detalle_orden_compra.deleteMany(),

        // 🔥 DEPENDEN DE pedido
        prisma.detalle_pedido.deleteMany(),

        // 🔥 AHORA PUEDES BORRAR PADRES
        prisma.pedido.deleteMany(),
        // prisma.orden_compra.deleteMany(),

        // 🔥 DEPENDEN DE producto
        prisma.producto_imagen.deleteMany(),
        prisma.producto_proveedor.deleteMany(),
        // prisma.wishlist.deleteMany(),

        // 🔥 AHORA SÍ
        prisma.variante_producto.deleteMany(),
        prisma.wishlist.deleteMany(),
        prisma.producto.deleteMany(),
        // prisma.genero_producto.deleteMany(),

        // 🔥 DESPUÉS SUS DEPENDENCIAS
        prisma.talla.deleteMany(),
        prisma.color.deleteMany(),
        prisma.marca.deleteMany(),
        prisma.genero_producto.deleteMany(),

        prisma.subcategoria.deleteMany(),
        prisma.categoria.deleteMany(),

    ])


    const { usuarios, generos, talla, marcas, colores, productos } = initialData

    // INSERCION DE DATOS A LA BASE DE DATOS

    await prisma.talla.createMany({ data: talla })
    await prisma.marca.createMany({ data: marcas })
    await prisma.color.createMany({ data: colores })
    await prisma.genero_producto.createMany({ data: generos })




    //   ----------------------------------------------------------
    // INSERCCIO  DE CATEGORIZACION ( catgeoria(subcategoria)
    //   ----------------------------------------------------------    
    const categorizacion = initialCategorizacion

    const categoriaMap = categorizacion.map((ct) => ({
        nombre: ct.nombre,
        slug: ct.slug
    }))

    const categoriaData = await prisma.categoria.createMany({
        data: categoriaMap
    })

    // console.log(categoriaData)

    for (const cate of categorizacion) {
        const cate_Index = await prisma.categoria.findFirst({
            where: { slug: cate.slug }
        })
        if (cate_Index) {
            for (const sub of cate.subcategorias) {
                await prisma.subcategoria.create({
                    data: {
                        nombre: sub.nombre,
                        slug: sub.slug,
                        categoria_id: cate_Index.id
                    }
                })
            }
        }
    }


    // ----------------------------------------------------
    // INSERCCION DE LOS PRODUCTOS CON SUS IMAGENES Y VARIANTES 
    //-----------------------------------------------------
    for (const item of productos) {
        const generoIndex = await prisma.genero_producto.findFirst({ where: { slug: item.generoNombre } })
        const marcaIndex = await prisma.marca.findUnique({ where: { nombre: item.marcaNombre } })
        const categoriaIndex = await prisma.categoria.findFirst({ where: { nombre: item.categoriaNombre } })
        const subcategoriaIndex = await prisma.subcategoria.findFirst({ where: { nombre: item.subcategoriaNombre } })

        if (!generoIndex  || !categoriaIndex || !subcategoriaIndex) {
            console.log(`Faltan los IDs requeridos para el producto: ${item.nombre}`)
            console.log({ producto: item.nombre, generoIndex, marcaIndex, categoriaIndex, subcategoriaIndex })
            continue
        }

        // Preparar las imagenes 
        const imagenesMap = []
        for (const img of item.imagenes) {
            const imgColorIndex = await prisma.color.findFirst({ where: { nombre: img.colorNombre } })
            if (!imgColorIndex) {
                console.log(`No existe el color ${img.colorNombre} para el producto ${item.nombre}`);
                continue;
            }
            imagenesMap.push({
                color_id: imgColorIndex.id,
                url_imagen: img.url,
            });
        }
        // Preparar las Variantes del Producto
        const variante_producto_map = []
        for (const vp of item.variantes) {
            const var_color_index = await prisma.color.findFirst({ where: { nombre: vp.colorNombre } })
            const var_talla_index = await prisma.talla.findFirst({ where: { valor: vp.tallaValor } })

            if (!var_color_index) {
                console.log(`No existe el color para la variante ${item.nombre} para el producto ${item.nombre}`);
                continue;
            }
            if (!var_talla_index) {
                console.log(`No existe talla  para la variante ${item.nombre} para el producto ${item.nombre}`);
                continue;
            }

            variante_producto_map.push({
                color_id: var_color_index.id,
                talla_id: var_talla_index.id,
                // codigo_barras:,
                // precio_extra:,
                // costo_compra: ,
                cantidad: vp.cantidad,
                // cantidad_minima,
                // cantidad_maxima,
            })
        }


        await prisma.producto.create({
            data: {
                nombre: item.nombre,
                slug: item.slug,
                descripcion: item.descripcion,
                // caracteristicas,
                precio_base_venta: item.precio_base,
                // precio_compra: item.precio_base,
                // precio_venta,
                // porcentaje_descuento,
                // en_oferta,
                subcategoria_id: subcategoriaIndex.id,
                genero_id: generoIndex.id,
                marca_id: marcaIndex?.id,
                // material_principal,
                // material_suela,
                // ...
                producto_imagen: {
                    createMany: { data: imagenesMap }
                },
                variante_producto: {
                    createMany: { data: variante_producto_map }
                }
            }
        })
    }






    /* 
 //  INSERCCION DE LA SEED DE Region/Provincia/Distrito
 const countries = initialCountrie

 const region = countries.map((item) => ({
     nombre: item.departamento
 }))
 await prisma.region.createMany({ data: region })
 for (const item of countries) {
     const departamentoIndex = await prisma.region.findFirst({ where: { nombre: item.departamento } })
     if (departamentoIndex) {
         for (const i of item.provincias) {
             await prisma.provincia.create({
                 data: {
                     nombre: i.nombre,
                     activo: true,
                     region_id: departamentoIndex.id,
                     distrito: {
                         create: i.distritos.map((dist) => ({
                             nombre: dist
                         }))
                     }

                 },
             })
         }
     }

 }
     */

}

const mainUsuario = async () => {

    // await prisma.usuario.deleteMany()

    await prisma.usuario.createMany({
        data: [
            {
                nombre: "Juan",
                apellido: "Pérez",
                email: "juan@demo.com",
                password_hash: bcryptjs.hashSync("12345", 10),
                documento_tipo: "DNI",
                documento_numero: "12345678",
                rol: "cliente",
                activo: true,
            },
            {
                nombre: "Carlos",
                apellido: "Ramos",
                email: "carlos@demo.com",
                password_hash: bcryptjs.hashSync("12345", 10),
                documento_tipo: "PASAPORTE",
                documento_numero: "P123456",
                rol: "admin",
                activo: true,
            },
            {
                nombre: "Lucía",
                apellido: "Torres",
                email: "lucia@demo.com",
                password_hash: bcryptjs.hashSync("12345", 10),
                rol: "almacenero",
                activo: true,
            },
        ]
    })

}

// Ejecución del seed
(async () => {
    if (process.env.NODE_ENV === "production") {
        console.log("❌ No se puede ejecutar seed en producción");
        return;
    }

    try {
        // await mainUsuario();
        await main()

        // await prisma.subcategoria.deleteMany()
        // await prisma.categoria.deleteMany()


    } catch (error) {
        console.error("❌ Error durante la ejecución del seed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();