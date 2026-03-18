import { titleFont } from "@/config/fonts"
import { getImagesProductByColor, getProductBySlug } from "@/src/actions/shop/product/productBySlug"
import ProductVariants from "@/src/components/shop/product/product-variants"
import { ProductDesktopSlideshow } from "@/src/components/shop/slideshow/ProductDesktopSlideshow"
import { ProductMobileSlideshow } from "@/src/components/shop/slideshow/ProductMobileSlideshow"
import { Metadata, ResolvingMetadata } from "next"

interface Props {
    params: Promise<{
        slug: string
    }>,
    searchParams: Promise<{
        colorId: string,
    }>
}



// Generar metadada del detalle del producto 
export async function generateMetadata(
    { params, searchParams }: Props,
): Promise<Metadata> {

    const { slug } = await params
    const { colorId } = await searchParams

    const res = await getProductBySlug({ slug })

    if (!res.ok) {
        return {
            title: "Producto no encontrado",
        }
    }

    const { product } = res

    let imageUrl: string | null = null

    // ✅ 1. Intentar con colorId de la URL
    if (colorId) {
        const { imagenes } = await getImagesProductByColor({
            productId: product.id,
            colorId: Number(colorId)
        })

        if (imagenes.length > 0) {
            imageUrl = imagenes[0]
        }
    }

    // ✅ 2. FALLBACK: primer color disponible
    if (!imageUrl && product.coloresDisponibles.length > 0) {
        const firstColorId = product.coloresDisponibles[0].id

        const { imagenes } = await getImagesProductByColor({
            productId: product.id,
            colorId: firstColorId
        })

        if (imagenes.length > 0) {
            imageUrl = imagenes[0]
        }
    }

    // ✅ 3. FALLBACK FINAL
    if (!imageUrl) {
        imageUrl = "images/products/no-image.png"
    }

    // ✅ URL absoluta
    const fullImageUrl = imageUrl.startsWith("http")
        ? imageUrl
        : `${process.env.NEXT_PUBLIC_SITE_URL}/images/products/${imageUrl}`

        console.log({fullImageUrl})
    return {
        title: product.nombre,
        description: product.descripcion,

        openGraph: {
            title: product.nombre,
            description: product.descripcion,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.slug}`,
            images: [
                {
                    url: fullImageUrl,
                    width: 1200,
                    height: 630,
                    alt: product.nombre,
                }
            ],
        },

        twitter: {
            card: "summary_large_image",
            images: [fullImageUrl],
        },
    }
}


const ProductSlugPage = async ({ params, searchParams }: Props) => {
    const { slug } = await params
    const { colorId } = await searchParams


    const res = await getProductBySlug({ slug: slug })



    if (!res.ok) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-red-500">{res.message}</p>
            </div>
        )
    }

    if (!res.product) {
        return (
            <div>
                <p>Product not found</p>
            </div>
        )
    }




    const { product } = res
    // const colorIdImg: number | undefined = product?.coloresDisponibles[0].id || 

    const { imagenes } = await getImagesProductByColor({ productId: product.id || 0, colorId: Number(colorId) })


    return (
        <div className="grid mt-5' grid-cols-1 md:grid-cols-3 gap-10 my-10 ">
            <div className="col-span-2">
                {/* desktop */}
                <ProductDesktopSlideshow
                    images={imagenes}
                    title=""
                    className="hidden md:block"
                />

                {/* Mobile */}
                <ProductMobileSlideshow
                    images={imagenes}
                    title=""
                    className="block md:hidden bg-gray-100 rounded-sm p-5"
                />
            </div>
            <div>
                <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
                    {product.nombre}
                </h1>

                <p className="text-lg mb-5">${product.precio_base_venta}</p>
                <ProductVariants
                    productSlug={product}
                    imagenes={imagenes}
                    productId={product.id || 0}
                    colores={product.coloresDisponibles || []}
                />
                <h3 className="font-bold">Descripción</h3>
                <p className={` antialiased`}>
                    {product.descripcion}
                </p>
            </div>
        </div>
    )
}

export default ProductSlugPage