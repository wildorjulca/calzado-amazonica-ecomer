

interface SeedCategoria {
    nombre: string;
    slug: string;
    subcategorias: {
        nombre: string,
        slug: string
    }[]
}

export const initialCategorizacion: SeedCategoria[] = [
    {
        nombre: "Zapatillas",
        slug: "zapatillas",
        subcategorias: [
            { nombre: "Zapatillas Urbanas", slug: "zapatillas-urbanas" },
            { nombre: "Zapatillas Casuales", slug: "zapatillas-casuales" },
            { nombre: "Zapatillas para Correr", slug: "zapatillas-para-correr" },
            { nombre: "Zapatillas de Entrenamiento", slug: "zapatillas-entrenamiento" },
            { nombre: "Zapatillas para Skate", slug: "zapatillas-skate" },
            { nombre: "Zapatillas para Exterior", slug: "zapatillas-exterior" },
            { nombre: "Zapatillas de Moda", slug: "zapatillas-moda" }
        ]
    },
    {
        nombre: "Zapatos",
        slug: "zapatos",
        subcategorias: [
            { nombre: "Zapatos Formales", slug: "zapatos-formales" },
            { nombre: "Zapatos de Vestir", slug: "zapatos-vestir" },
            { nombre: "Zapatos Casuales", slug: "zapatos-casuales" },
            { nombre: "Zapatos Oxford", slug: "zapatos-oxford" },
            { nombre: "Zapatos Derby", slug: "zapatos-derby" },
            { nombre: "Mocasines", slug: "mocasines" },
            { nombre: "Zapatos Náuticos", slug: "zapatos-nauticos" },
            { nombre: "Zapatos sin Cordones", slug: "zapatos-sin-cordones" }
        ]
    },
    {
        nombre: "Botines y Botas",
        slug: "botines-botas",
        subcategorias: [
            { nombre: "Botines", slug: "botines" },
            { nombre: "Botas Cortas", slug: "botas-cortas" },
            { nombre: "Botas Largas", slug: "botas-largas" },
            { nombre: "Botas de Cuero", slug: "botas-cuero" },
            { nombre: "Botas Impermeables", slug: "botas-impermeables" },
            { nombre: "Botas de Invierno", slug: "botas-invierno" },
            { nombre: "Botas con Tacón", slug: "botas-tacon" }
        ]
    },
    {
        nombre: "Sandalias",
        slug: "sandalias",
        subcategorias: [
            { nombre: "Sandalias Casuales", slug: "sandalias-casuales" },
            { nombre: "Sandalias Elegantes", slug: "sandalias-elegantes" },
            { nombre: "Sandalias de Playa", slug: "sandalias-playa" },
            { nombre: "Sandalias con Plataforma", slug: "sandalias-plataforma" },
            { nombre: "Sandalias con Tacón", slug: "sandalias-tacon" },
            { nombre: "Sandalias Deportivas", slug: "sandalias-deportivas" }
        ]
    },
    {
        nombre: "Calzado Deportivo",
        slug: "calzado-deportivo",
        subcategorias: [
            { nombre: "Fútbol", slug: "futbol" },
            { nombre: "Baloncesto", slug: "baloncesto" },
            { nombre: "Vóley", slug: "voley" },
            { nombre: "Tenis", slug: "tenis" },
            { nombre: "Caminata", slug: "caminata" },
            { nombre: "Senderismo", slug: "senderismo" }
        ]
    },
    {
        nombre: "Calzado Infantil",
        slug: "calzado-infantil",
        subcategorias: [
            { nombre: "Bebé", slug: "bebe" },
            { nombre: "Primeros Pasos", slug: "primeros-pasos" },
            { nombre: "Niño", slug: "nino" },
            { nombre: "Niña", slug: "nina" },
            { nombre: "Escolar", slug: "escolar" }
        ]
    },
    {
        nombre: "Pantuflas y Calzado de Casa",
        slug: "pantuflas-calzado-casa",
        subcategorias: [
            { nombre: "Pantuflas", slug: "pantuflas" },
            { nombre: "Pantuflas de Invierno", slug: "pantuflas-invierno" },
            { nombre: "Pantuflas de Verano", slug: "pantuflas-verano" },
            { nombre: "Calzado de Casa", slug: "calzado-casa" }
        ]
    },
    {
        nombre: "Calzado Casual de Verano",
        slug: "calzado-casual-verano",
        subcategorias: [
            { nombre: "Ojotas", slug: "ojotas" },
            { nombre: "Chancletas", slug: "chancletas" },
            { nombre: "Alpargatas", slug: "alpargatas" },
            { nombre: "Espadrilles", slug: "espadrilles" },
            { nombre: "Zuecos", slug: "zuecos" }
        ]
    },
    {
        nombre: "Calzado Especializado",
        slug: "calzado-especializado",
        subcategorias: [
            { nombre: "Calzado de Trabajo", slug: "calzado-trabajo" },
            { nombre: "Calzado de Seguridad", slug: "calzado-seguridad" },
            { nombre: "Calzado Médico", slug: "calzado-medico" },
            { nombre: "Calzado Ortopédico", slug: "calzado-ortopedico" },
            { nombre: "Calzado Antideslizante", slug: "calzado-antideslizante" }
        ]
    },
    {
        nombre: "Tacos y Tacones",
        slug: "tacos-tacones",
        subcategorias: [
            { nombre: "Tacos Altos", slug: "tacos-altos" },
            { nombre: "Tacos Medios", slug: "tacos-medios" },
            { nombre: "Tacos Bajos", slug: "tacos-bajos" },
            { nombre: "Tacones de Aguja", slug: "tacones-aguja" },
            { nombre: "Tacones Anchos", slug: "tacones-anchos" },
            { nombre: "Tacones con Plataforma", slug: "tacones-plataforma" },
            { nombre: "Zapatos de Tacón", slug: "zapatos-tacon" }
        ]
    }

]
