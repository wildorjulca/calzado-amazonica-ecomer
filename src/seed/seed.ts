import bcryptjs from 'bcryptjs'


enum usuario_documento_tipo {
    DNI,
    CE,
    PASAPORTE
}

enum usuario_rol {
    cliente,
    admin,
    vendedor,
    almacenero
}
interface Marca {
    nombre: string;
    slug: string;
    descripcion: string;

}
interface Talla {
    valor: string;
    activo: boolean
}
interface Genero {
    nombre: string;
    slug: string
}

interface Color {
    nombre: string;
    slug: string
    codigo_hex: string
}
interface Region {
    nombre: string;
    activo: boolean
}
export interface Usuario {
    nombre: string;
    apellido?: string | null;
    email: string;
    password_hash: string;
    telefono?: string | null;

    documento_tipo?: usuario_documento_tipo | null;
    documento_numero?: string | null;

    fecha_nacimiento?: Date | null;

    direccion?: string | null;
    ciudad?: string | null;
    distrito?: string | null;
    codigo_postal?: string | null;

    rol?: usuario_rol | null;

    email_verificado?: boolean | null;
    telefono_verificado?: boolean | null;
    activo?: boolean | null;

    creado_en?: Date | null;
    ultimo_login?: Date | null;
}
interface ImagenProducto {
    colorNombre: string;
    url: string
}
interface VarianteProducto {
    colorNombre: string;
    tallaValor: string;
    cantidad: number

}

export interface ProductoZapatilla {
    nombre: string;
    slug: string;
    descripcion: string;
    precio_base: number;

    generoNombre: string;
    categoriaNombre: string;
    subcategoriaNombre: string;
    marcaNombre?: string;

    nuevo?: boolean;
    caracteristicas: string;

    imagenes: ImagenProducto[];
    variantes: VarianteProducto[];
}

interface SeedData {
    talla: Talla[]
    usuarios: Usuario[],
    generos: Genero[],
    marcas: Marca[],
    colores: Color[],
    productos: ProductoZapatilla[]
}

export const initialData: SeedData = {
    productos: [
        // =========================================
        //  *** CATEGORÍA: Calzado Deportivo ***  // 
        // ========================================
        // **subcattegoria: Zapatillas Urbanas 


        //NIKE

        {
            nombre: "Nike Air Max 90",
            slug: "nike-air-max-90",
            descripcion: "Zapatilla icónica con amortiguación Air Max y diseño urbano.",
            precio_base: 399.9,
            generoNombre: "Hombre",
            categoriaNombre: "Zapatillas",
            subcategoriaNombre: "Zapatillas Urbanas",
            marcaNombre: "Nike",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Rojo", url: "01.png" },
                { colorNombre: "Rojo", url: "02.png" },
                { colorNombre: "Rojo", url: "03.png" },
                { colorNombre: "Rojo", url: "05.png" },
                { colorNombre: "Marrón", url: "11.png" },
                { colorNombre: "Marrón", url: "12.png" },
                { colorNombre: "Marrón", url: "13.png" },
                { colorNombre: "Marrón", url: "14.png" },
                // 
                { colorNombre: "Blanco", url: "15.png" },
                { colorNombre: "Blanco", url: "16.png" },
                { colorNombre: "Blanco", url: "17.png" },
            ],
            variantes: [
                { colorNombre: "Rojo", tallaValor: "38", cantidad: 15 },
                { colorNombre: "Rojo", tallaValor: "39", cantidad: 12 },
                { colorNombre: "Rojo", tallaValor: "40", cantidad: 10 },
                { colorNombre: "Rojo", tallaValor: "41", cantidad: 6 },

                { colorNombre: "Marrón", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Marrón", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Marrón", tallaValor: "40", cantidad: 6 },

                { colorNombre: "Blanco", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Blanco", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Blanco", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Blanco", tallaValor: "41", cantidad: 6 },
            ]
        },
        {
            nombre: "Nike Court Borough Low Next Bloom",
            slug: "nike-court-borough-low-next-bloom",
            descripcion: "Inspiradas en el estilo retro de baloncesto, las Court Borough están confeccionadas con piel sintética para ofrecer un toque clásico y se han reinventado con una comodidad moderna, como el espacio adicional en la puntera.",
            precio_base: 320,
            generoNombre: "Hombre",
            categoriaNombre: "Zapatillas",
            subcategoriaNombre: "Zapatillas Urbanas",
            marcaNombre: "Nike",
            caracteristicas: `
            • Modelo: IQ2722-100
            • Suela: Goma con cámara Air
            `,
            imagenes: [
                { colorNombre: "Azul", url: "18.png" },
                { colorNombre: "Azul", url: "19.png" },
                { colorNombre: "Azul", url: "20.png" },
                { colorNombre: "Rojo", url: "21.png" },
                { colorNombre: "Negro", url: "22.png" },
                { colorNombre: "Negro", url: "23.png" },
                { colorNombre: "Negro", url: "24.png" },
                { colorNombre: "Negro", url: "25.png" },

            ],
            variantes: [
                { colorNombre: "Azul", tallaValor: "38", cantidad: 15 },
                { colorNombre: "Azul", tallaValor: "39", cantidad: 12 },
                { colorNombre: "Azul", tallaValor: "40", cantidad: 10 },
                { colorNombre: "Azul", tallaValor: "41", cantidad: 8 },

                { colorNombre: "Negro", tallaValor: "38", cantidad: 10 },
                { colorNombre: "Negro", tallaValor: "39", cantidad: 12 },
                { colorNombre: "Negro", tallaValor: "40", cantidad: 40 },
            ]
        },
        // // ADIDAS
        {
            nombre: "Zapatillas Running Hombre Adidas Runblaze",
            slug: "zapatillas-running-hombre-adidas-runblaze",
            descripcion: "Zapatilla icónica con amortiguación Nike Max y diseño urbano.",
            precio_base: 170,
            generoNombre: "Hombre",
            categoriaNombre: "Zapatillas",
            subcategoriaNombre: "Zapatillas para Correr",
            marcaNombre: "Adidas",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Negro", url: "26.png" },
                { colorNombre: "Negro", url: "27.png" },

                // 
                { colorNombre: "Azul", url: "28.png" },
                { colorNombre: "Azul", url: "29.png" },
            ],
            variantes: [
                { colorNombre: "Negro", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad: 6 },

                { colorNombre: "Azul", tallaValor: "38", cantidad: 15 },
                { colorNombre: "Azul", tallaValor: "39", cantidad: 12 },
                { colorNombre: "Azul", tallaValor: "40", cantidad: 10 },
                { colorNombre: "Azul", tallaValor: "41", cantidad: 6 },

            ]
        },


        // Joma
        {
            nombre: "Zapatillas Futbol Sala Cancha 2601 IN Blanco Morado Negro",
            slug: "Zapatillas-Futbol-Sala-Cancha-2601-IN-Blanco-Morado-Negro",
            descripcion: "Zapatillas de fútbol sala diseñadas para un rendimiento confiable en cancha. El modelo Cancha acompaña el juego con una combinación equilibrada de confort, control y estabilidad, pensado para jugadores que buscan precisión en los gestos técnicos propios del futsal.",
            precio_base: 190,
            generoNombre: "Hombre",
            categoriaNombre: "Calzado Deportivo",
            subcategoriaNombre: "Fútbol",
            marcaNombre: "joma",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Morado", url: "88.png" },
                { colorNombre: "Morado", url: "89.png" },
                { colorNombre: "Morado", url: "90.png" },
                { colorNombre: "Morado", url: "91.png" },
            ],
            variantes: [
                { colorNombre: "Morado", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Morado", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Morado", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Morado", tallaValor: "41", cantidad: 6 },

            ]
        },
        {
            nombre: "Zapatillas Futbol Sala Cancha 2605 IN Celeste",
            slug: "Zapatillas-Futbol-Sala-Cancha-2605-IN-Celeste",
            descripcion: "Zapatillas de fútbol sala diseñadas para un rendimiento confiable en cancha. El modelo Cancha acompaña el juego con una combinación equilibrada de confort, control y estabilidad, pensado para jugadores que buscan precisión en los gestos técnicos propios del futsal.",
            precio_base: 200,
            generoNombre: "Hombre",
            categoriaNombre: "Calzado Deportivo",
            subcategoriaNombre: "Fútbol",
            marcaNombre: "joma",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Azul Claro", url: "92.png" },
                { colorNombre: "Azul Claro", url: "93.png" },
                { colorNombre: "Azul Claro", url: "94.png" },
                { colorNombre: "Azul Claro", url: "95.png" },
            ],
            variantes: [
                { colorNombre: "Azul Claro", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Azul Claro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Azul Claro", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Azul Claro", tallaValor: "41", cantidad: 6 },
            ]
        },
        {
            nombre: "Zapatillas Futbol Sala Top Flex Plus 15 IN Turquesa",
            slug: "Zapatillas-Futbol-Sala-Top-Flex-Plus-15-IN-Turquesa",
            descripcion: "Zapatillas de fútbol sala diseñadas para un rendimiento confiable en cancha. El modelo Cancha acompaña el juego con una combinación equilibrada de confort, control y estabilidad, pensado para jugadores que buscan precisión en los gestos técnicos propios del futsal.",
            precio_base: 380,
            generoNombre: "Hombre",
            categoriaNombre: "Calzado Deportivo",
            subcategoriaNombre: "Fútbol",
            marcaNombre: "joma",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Turquesa", url: "96.png" },
                { colorNombre: "Turquesa", url: "97.png" },
                { colorNombre: "Turquesa", url: "98.png" },
                { colorNombre: "Turquesa", url: "99.png" },
            ],
            variantes: [
                { colorNombre: "Turquesa", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Turquesa", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Turquesa", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Turquesa", tallaValor: "41", cantidad: 6 },
            ]
        },

        // ** subcatgegoria zapatillas-casuales

        // 
        {
            nombre: "Zapatillas Urbanas Hombre Nike Pacific",
            slug: "zapatillas-urbanas-hombre-nike-pacific",
            descripcion: "Zapatilla icónica con amortiguación Nike Max y diseño urbano.",
            precio_base: 80,
            generoNombre: "Hombre",
            categoriaNombre: "Zapatillas",
            subcategoriaNombre: "Zapatillas Casuales",
            marcaNombre: "Nike",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Negro", url: "30.png" },
                { colorNombre: "Negro", url: "31.png" },

                // 
                { colorNombre: "Azul", url: "28.png" },
                { colorNombre: "Azul", url: "29.png" },
            ],
            variantes: [
                { colorNombre: "Negro", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad: 6 },
            ]
        },

        // Marca columbia
        {
            nombre: "Botines Para Hombre Outdry™ Peakfreak™ II Plomos Columbia",
            slug: "Botines-para-hombre-outdry-peakfreak-II-Plomos-Columbia",
            descripcion: "Botines Para Hombre Outdry™ Peakfreak™ II Plomos Columbia.Aventura sin límites. Estos botines de senderismo de media caña y alto rendimiento no solo son impermeables, sino que también cuentan con una suela ultra adherente para una tracción excepcional en senderos húmedos o secos.",
            precio_base: 550,
            generoNombre: "Hombre",
            categoriaNombre: "Botines y Botas",
            subcategoriaNombre: "Botas Impermeables",
            marcaNombre: "Columbia",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Negro", url: "32.png" },
                { colorNombre: "Negro", url: "33.png" },
                { colorNombre: "Negro", url: "34.png" },
                { colorNombre: "Negro", url: "35.png" },
                { colorNombre: "Negro", url: "36.png" },

                // 
                { colorNombre: "Azul", url: "37.png" },
                { colorNombre: "Azul", url: "38.png" },
                { colorNombre: "Azul", url: "39.png" },
                { colorNombre: "Azul", url: "40.png" },
                { colorNombre: "Azul", url: "41.png" },

            ],
            variantes: [
                { colorNombre: "Negro", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad: 6 },

                { colorNombre: "azul", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Azul", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Azul", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Azul", tallaValor: "41", cantidad: 6 },
                { colorNombre: "Azul", tallaValor: "42", cantidad: 6 },

            ]
        },
        {
            nombre: "Botas Para Mujer Impermeable strata Trail™ Grises Columbia",
            slug: "Botas-para-Mujer-Impermeable-strata-Trail-Grises-Columbia",
            descripcion: "Botas Para Mujer Impermeablestrata Trail™ Grises Columbia. Impermeable y adherente. Estos zapatos livianos de altura media te permitirán caminar por senderos en condiciones difíciles y están confeccionados con una lengüeta reforzada para evitar la entrada de escombros, para que tus pies se mantengan cómodos.",
            precio_base: 500,
            generoNombre: "Mujer",
            categoriaNombre: "Botines y Botas",
            subcategoriaNombre: "Botas Impermeables",
            marcaNombre: "Columbia",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Café", url: "42.png" },
                { colorNombre: "Café", url: "43.png" },
                { colorNombre: "Café", url: "44.png" },
                { colorNombre: "Café", url: "45.png" },
            ],
            variantes: [
                { colorNombre: "Café", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Café", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Café", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Café", tallaValor: "41", cantidad: 6 },

            ]
        },

        {
            nombre: "Botines Para Hombre Botas de Cuero Newton Wander™ Negras Columbia",
            slug: "Botines-Para-Hombre-Botas-de-Cuero-Newton-Wander-Negras-Columbia",
            descripcion: "Botas Para Mujer Impermeablestrata Trail™ Grises Columbia. Impermeable y adherente. Estos zapatos livianos de altura media te permitirán caminar por senderos en condiciones difíciles y están confeccionados con una lengüeta reforzada para evitar la entrada de escombros, para que tus pies se mantengan cómodos.",
            precio_base: 580,
            generoNombre: "Hombre",
            categoriaNombre: "Botines y Botas",
            subcategoriaNombre: "Botas de Cuero",
            marcaNombre: "Columbia",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Marrón", url: "46.png" },
                { colorNombre: "Marrón", url: "47.png" },
                { colorNombre: "Marrón", url: "48.png" },
                { colorNombre: "Marrón", url: "49.png" },
                { colorNombre: "Marrón", url: "50.png" },

                { colorNombre: "Gris Oscuro", url: "51.png" },
                { colorNombre: "Gris Oscuro", url: "52.png" },
                { colorNombre: "Gris Oscuro", url: "53.png" },
                { colorNombre: "Gris Oscuro", url: "54.png" },

                { colorNombre: "Negro", url: "55.png" },
                { colorNombre: "Negro", url: "56.png" },
                { colorNombre: "Negro", url: "57.png" },
                { colorNombre: "Negro", url: "58.png" },
            ],
            variantes: [
                { colorNombre: "Marrón", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Marrón", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Marrón", tallaValor: "41", cantidad: 6 },
                { colorNombre: "Marrón", tallaValor: "42", cantidad: 6 },

                { colorNombre: "Gris Oscuro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Gris Oscuro", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Gris Oscuro", tallaValor: "41", cantidad: 6 },
                { colorNombre: "Gris Oscuro", tallaValor: "42", cantidad: 6 },

                { colorNombre: "Negro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "42", cantidad: 6 },
            ],
        },
        {
            nombre: "Nike Air Max Cirro",
            slug: "Nike-Air-Max-Cirro",
            descripcion: "Ya sea que vayas al gimnasio o a la tienda, creamos el punto medio perfecto que brinda estilo rápido y comodidad increíble. El Air visible y grande en el talón se combina con una plantilla de espuma cómoda para dar una declaración total de comodidad.",
            precio_base: 580,
            generoNombre: "Hombre",
            categoriaNombre: "Sandalias",
            subcategoriaNombre: "Sandalias Deportivas",
            marcaNombre: "Nike",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Turquesa", url: "59.png" },
                { colorNombre: "Turquesa", url: "60.png" },
                { colorNombre: "Turquesa", url: "61.png" },
                { colorNombre: "Turquesa", url: "62.png" },

                { colorNombre: "Negro", url: "63.png" },
                { colorNombre: "Negro", url: "64.png" },
                { colorNombre: "Negro", url: "65.png" },
            ],
            variantes: [
                { colorNombre: "Negro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "41", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "42", cantidad: 6 },

                { colorNombre: "Turquesa", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Turquesa", tallaValor: "40", cantidad: 6 },
                { colorNombre: "Turquesa", tallaValor: "41", cantidad: 6 },
                { colorNombre: "Turquesa", tallaValor: "42", cantidad: 6 },
            ],
        },

        // pantuflas
        {
            nombre: "Sandalias pantuflas ugg cozetta curly mujer",
            slug: "SANDALIAS-PANTUFLAS-UGG-COZETTA-CURLY-MUJER",
            descripcion: "Además de un empeine de piel de oveja rizada supersuave y nuestro emblemático forro UGGplush™, las Cozetta cuentan con una suela de espuma SugarSole™ de origen sostenible hecha con caña de azúcar renovable, que ofrece amortiguación tanto en interiores como en exteriores para que puedas llevarte la sensación de UGG vayas donde vayas. Combínalas con tu ropa de fin de semana favorita. Material Piel de Oveja.",
            precio_base: 80,
            generoNombre: "Mujer",
            categoriaNombre: "Pantuflas y Calzado de Casa",
            subcategoriaNombre: "Pantuflas de Invierno",
            marcaNombre: "",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Rosado", url: "78.png" },
                { colorNombre: "Rosado", url: "79.png" },
                { colorNombre: "Rosado", url: "80.png" },

            ],
            variantes: [
                { colorNombre: "Rosado", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Rosado", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Rosado", tallaValor: "40", cantidad: 6 },

            ],
        },
        {
            nombre: "Pantufla Infantil con Diseño",
            slug: "Pantufla-Infantil-con-Diseño",
            descripcion: "Pantuflas infantiles con diseño estampado y suela firma y resistente.",
            precio_base: 40,
            generoNombre: "Niña",
            categoriaNombre: "Pantuflas y Calzado de Casa",
            subcategoriaNombre: "Pantuflas de Invierno",
            marcaNombre: "",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Azul Claro", url: "81.png" },
                { colorNombre: "Azul Claro", url: "82.png" },

                { colorNombre: "Rosado", url: "83.png" },
                { colorNombre: "Rosado", url: "84.png" },


            ],
            variantes: [
                { colorNombre: "Azul Claro", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Azul Claro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Azul Claro", tallaValor: "40", cantidad: 6 },

                { colorNombre: "Rosado", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Rosado", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Rosado", tallaValor: "40", cantidad: 6 },



            ],
        },

        {
            nombre: "Pantuflas Mujer Unicornio Hypnotic",
            slug: "Pantuflas-Mujer-Unicornio-Hypnotic",
            descripcion: "Pantuflas mujer Disfruta de lo nuevo en Lencería, Pantuflas Mujer Unicornio Hypnotic. Compra Online solo en calazdoAmazonica.pe",
            precio_base: 60,
            generoNombre: "Mujer",
            categoriaNombre: "Pantuflas y Calzado de Casa",
            subcategoriaNombre: "Calzado de Casa",
            marcaNombre: "",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Rosado", url: "85.png" },
                { colorNombre: "Rosado", url: "86.png" },
                { colorNombre: "Rosado", url: "87.png" },
            ],
            variantes: [
                { colorNombre: "Rosado", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Rosado", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Rosado", tallaValor: "40", cantidad: 6 },
            ],
        },
        // Tacos  y tacones

        {
            nombre: "Impuls Sandalias Taco Mujer Negro Ariana04",
            slug: "Impuls-Sandalias-Taco-Mujer-Negro-Ariana04",
            descripcion: "Impuls Sandalias Taco Mujer Negro Ariana04 de la marca Impuls. Sandalias con taco que elevan tu estilo con elegancia y actitud. Diseñadas para realzar la figura y destacar en cada ocasión, combinan líneas modernas con detalles que marcan la diferencia.",
            precio_base: 180,
            generoNombre: "Mujer",
            categoriaNombre: "Tacos y Tacones",
            subcategoriaNombre: "Zapatos de Tacón",
            marcaNombre: "",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Negro", url: "66.png" },
                { colorNombre: "Negro", url: "67.png" },

            ],
            variantes: [
                { colorNombre: "Negro", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad: 6 },
            ],
        },

        {
            nombre: "Impuls Sandalia Taco Mujer Blanco Natasha03",
            slug: "Impuls-Sandalia-Taco-Mujer-Blanco-Natasha03",
            descripcion: "Impuls Sandalia Taco Mujer Blanco Natasha03 de la marca Impuls. Sandalias con taco que elevan tu estilo con elegancia y actitud. Diseñadas para realzar la figura y destacar en cada ocasión, combinan líneas modernas con detalles que marcan la diferencia.",
            precio_base: 120,
            generoNombre: "Mujer",
            categoriaNombre: "Tacos y Tacones",
            subcategoriaNombre: "Zapatos de Tacón",
            marcaNombre: "",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "crema", url: "68.png" },
                { colorNombre: "crema", url: "69.png" },
                { colorNombre: "crema", url: "70.png" },
                { colorNombre: "crema", url: "71.png" },

            ],
            variantes: [
                { colorNombre: "crema", tallaValor: "38", cantidad: 6 },
                { colorNombre: "crema", tallaValor: "39", cantidad: 6 },
            ],
        },
        {
            nombre: "mpuls Taco Mujer Negro Meja06",
            slug: "mpuls-aco-Mujer-Negro-Meja06",
            descripcion: "Impuls Sandalias Taco Mujer Negro Meja06 de la marca Impuls. Sandalias con taco que elevan tu estilo con elegancia y actitud. Diseñadas para realzar la figura y destacar en cada ocasión, combinan líneas modernas con detalles que marcan la diferencia.",
            precio_base: 120,
            generoNombre: "Mujer",
            categoriaNombre: "Tacos y Tacones",
            subcategoriaNombre: "Tacos Altos",
            marcaNombre: "",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Negro", url: "72.png" },
                { colorNombre: "Negro", url: "73.png" },
                { colorNombre: "Negro", url: "74.png" },

            ],
            variantes: [
                { colorNombre: "Negro", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Negro", tallaValor: "40", cantidad: 6 },

            ],
        },
        {
            nombre: "Impuls Sandalia Taco Mujer Hielo Meja04",
            slug: "mpuls-aco-Mujer-blanco-Meja04",
            descripcion: "Impuls Sandalias Taco Mujer Negro Meja06 de la marca Impuls. Sandalias con taco que elevan tu estilo con elegancia y actitud. Diseñadas para realzar la figura y destacar en cada ocasión, combinan líneas modernas con detalles que marcan la diferencia.",
            precio_base: 120,
            generoNombre: "Mujer",
            categoriaNombre: "Tacos y Tacones",
            subcategoriaNombre: "Tacos Altos",
            marcaNombre: "",
            nuevo: true,
            caracteristicas: `
            • Material: Malla y cuero sintético
            • Suela: Goma con cámara Air
            • Uso: Urbano y caminata
            `,
            imagenes: [
                { colorNombre: "Blanco", url: "75.png" },
                { colorNombre: "Blanco", url: "76.png" },
                { colorNombre: "Blanco", url: "77.png" },

            ],
            variantes: [
                { colorNombre: "Blanco", tallaValor: "38", cantidad: 6 },
                { colorNombre: "Blanco", tallaValor: "39", cantidad: 6 },
                { colorNombre: "Blanco", tallaValor: "40", cantidad: 6 },

            ],
        },







        // 👉 Aquí ya tienes 5
        // 👉 Puedes duplicar el patrón hasta llegar a 10
    ],

    usuarios: [
        {
            nombre: "Juan",
            apellido: "Pérez",
            email: "juan@demo.com",
            password_hash: bcryptjs.hashSync("12345", 10),
            // documento_tipo: usuario_documento_tipo.DNI,
            // documento_numero: "12345678",
            rol: usuario_rol.cliente,
            activo: true,
        },
        {
            nombre: "María",
            apellido: "Gómez",
            email: "maria@demo.com",
            password_hash: bcryptjs.hashSync("12345", 10),
            documento_tipo: usuario_documento_tipo.CE,
            documento_numero: "CE987654",
            rol: usuario_rol.vendedor,
            activo: true,
        },
        {
            nombre: "Carlos",
            apellido: "Ramos",
            email: "carlos@demo.com",
            password_hash: bcryptjs.hashSync("12345", 10),
            documento_tipo: usuario_documento_tipo.PASAPORTE,
            documento_numero: "P123456",
            rol: usuario_rol.admin,
            activo: true,
        },
        {
            nombre: "Lucía",
            apellido: "Torres",
            email: "lucia@demo.com",
            password_hash: bcryptjs.hashSync("12345", 10),
            rol: usuario_rol.almacenero,
            activo: true,
        },
    ],
    generos: [
        { nombre: "Hombre", slug: "hombre" },
        { nombre: "Mujer", slug: "mujer" },
        { nombre: "Unisex", slug: "unisex" },
        { nombre: "Niño", slug: "nino" },
        { nombre: "Niña", slug: "nina" }
    ],
    talla: [
        { valor: "35", activo: true },
        { valor: "36", activo: true },
        { valor: "37", activo: true },
        { valor: "38", activo: true },
        { valor: "39", activo: true },
        { valor: "40", activo: true },
        { valor: "41", activo: true },
        { valor: "42", activo: true },
        { valor: "43", activo: true },
        { valor: "44", activo: true },
        { valor: "45", activo: true },
    ],
    marcas: [
        {
            nombre: "Nike",
            slug: "nike",
            descripcion: "Marca estadounidense líder en zapatillas deportivas, running y lifestyle."
        },
        {
            nombre: "Adidas",
            slug: "adidas",
            descripcion: "Marca alemana reconocida por su innovación en zapatillas deportivas y urbanas."
        },
        {
            nombre: "Puma",
            slug: "puma",
            descripcion: "Marca deportiva que combina rendimiento, estilo y moda urbana."
        },
        {
            nombre: "Columbia",
            slug: "columbia",
            descripcion: "Marca muy resistentes todo Terreno."
        },
        {
            nombre: "Reebok",
            slug: "reebok",
            descripcion: "Especializada en entrenamiento, fitness y calzado deportivo clásico."
        },
        {
            nombre: "New Balance",
            slug: "new-balance",
            descripcion: "Marca conocida por su comodidad, running y zapatillas casuales."
        },
        {
            nombre: "Converse",
            slug: "converse",
            descripcion: "Marca icónica de zapatillas urbanas y casuales, famosa por las Chuck Taylor."
        },
        {
            nombre: "Vans",
            slug: "vans",
            descripcion: "Marca asociada al skate, estilo urbano y cultura juvenil."
        },
        {
            nombre: "Fila",
            slug: "fila",
            descripcion: "Marca deportiva con fuerte presencia en moda urbana y retro."
        },
        {
            nombre: "Asics",
            slug: "asics",
            descripcion: "Especialista en zapatillas para running y alto rendimiento deportivo."
        },
        {
            nombre: "Under Armour",
            slug: "under-armour",
            descripcion: "Marca enfocada en rendimiento deportivo y tecnología en calzado."
        },
        {
            nombre: "Skechers",
            slug: "skechers",
            descripcion: "Marca reconocida por la comodidad y el uso diario."
        },
        {
            nombre: "Jordan",
            slug: "jordan",
            descripcion: "Línea premium de zapatillas inspiradas en el básquet y Michael Jordan."
        },
        {
            nombre: "Joma",
            slug: "joma",
            descripcion: "Descubre JOMA Perú, la mejor opción en calzado y ropa deportiva para todos los deportes. Calidad y confort para tu rendimiento."
        },
        {
            nombre: "Hoka",
            slug: "hoka",
            descripcion: "Marca especializada en running con máxima amortiguación."
        },
        {
            nombre: "Salomon",
            slug: "salomon",
            descripcion: "Marca enfocada en trail running, trekking y outdoor."
        },
        {
            nombre: "Merrell",
            slug: "merrell",
            descripcion: "Especialista en calzado outdoor y senderismo."
        },
        {
            nombre: "Timberland",
            slug: "timberland",
            descripcion: "Marca reconocida por botas y calzado resistente de estilo urbano."
        },
        {
            nombre: "Clarks",
            slug: "clarks",
            descripcion: "Marca enfocada en comodidad y calzado casual."
        },
        {
            nombre: "Dr. Martens",
            slug: "dr-martens",
            descripcion: "Marca icónica de calzado urbano y botas de estilo alternativo."
        }
    ],
    colores: [
        // Básicos
        { nombre: "Negro", slug: "negro", codigo_hex: "#000000" },
        { nombre: "Blanco", slug: "blanco", codigo_hex: "#FFFFFF" },
        { nombre: "Gris", slug: "gris", codigo_hex: "#808080" },
        { nombre: "Gris Claro", slug: "gris-claro", codigo_hex: "#D3D3D3" },
        { nombre: "Gris Oscuro", slug: "gris-oscuro", codigo_hex: "#4F4F4F" },

        // Azules
        { nombre: "Azul", slug: "azul", codigo_hex: "#0057FF" },
        { nombre: "Azul Marino", slug: "azul-marino", codigo_hex: "#001F3F" },
        { nombre: "Azul Claro", slug: "azul-claro", codigo_hex: "#87CEEB" },

        // Rojos y rosados
        { nombre: "Rojo", slug: "rojo", codigo_hex: "#FF0000" },
        { nombre: "Borgoña", slug: "borgona", codigo_hex: "#800020" },
        { nombre: "Rosado", slug: "rosado", codigo_hex: "#FF69B4" },

        // Verdes
        { nombre: "Verde", slug: "verde", codigo_hex: "#008000" },
        { nombre: "Verde Oliva", slug: "verde-oliva", codigo_hex: "#556B2F" },
        { nombre: "Verde Militar", slug: "verde-militar", codigo_hex: "#4B5320" },

        // Amarillos y naranjas
        { nombre: "Amarillo", slug: "amarillo", codigo_hex: "#FFD700" },
        { nombre: "Mostaza", slug: "mostaza", codigo_hex: "#FFDB58" },
        { nombre: "Naranja", slug: "naranja", codigo_hex: "#FFA500" },

        // Marrones y beige
        { nombre: "Marrón", slug: "marron", codigo_hex: "#8B4513" },
        { nombre: "Café", slug: "cafe", codigo_hex: "#6F4E37" },
        { nombre: "Beige", slug: "beige", codigo_hex: "#F5F5DC" },
        { nombre: "Crema", slug: "crema", codigo_hex: "#FFFDD0" },

        // Especiales / moda
        { nombre: "Morado", slug: "morado", codigo_hex: "#800080" },
        { nombre: "Lavanda", slug: "lavanda", codigo_hex: "#E6E6FA" },
        { nombre: "Turquesa", slug: "turquesa", codigo_hex: "#40E0D0" },
        { nombre: "Dorado", slug: "dorado", codigo_hex: "#FFD700" },
        { nombre: "Plateado", slug: "plateado", codigo_hex: "#C0C0C0" }
    ]

};
