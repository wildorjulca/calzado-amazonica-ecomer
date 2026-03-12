

// Definición de tipos
interface Distrito {
    nombre: string;
}

interface Provincia {
    nombre: string;
    distritos: string[];
}

interface SeedCountries {
    departamento: string;
    provincias: Provincia[];
}

// interface SeedCountries {
//     departamento: string[]
// }


// Array de departamentos
export const initialCountrie: SeedCountries[] = [
    {
        departamento: "Amazonas",
        provincias: [
            { nombre: "Chachapoyas", distritos: ["Chachapoyas", "Asunción", "Balsas"] },
            { nombre: "Bagua", distritos: ["Bagua", "Cajaruro", "El Parco"] },
            { nombre: "Bongará", distritos: ["Chisquilla", "Churuja", "Cuispes"] },
            { nombre: "Condorcanqui", distritos: ["Nieva", "El Cenepa", "Río Santiago"] },
            { nombre: "Luya", distritos: ["Luya", "Cocabamba", "San Cristóbal"] },
            { nombre: "Rodríguez de Mendoza", distritos: ["Mendoza", "Cochamal", "Chirimoto"] },
            { nombre: "Utcubamba", distritos: ["Bagua Grande", "Cajaruro", "El Milagro"] }
        ]
    },
    {
        departamento: "Áncash",
        provincias: [
            { nombre: "Aija", distritos: ["Aija", "Coris", "La Merced"] },
            { nombre: "Antonio Raymondi", distritos: ["Chacas", "Asunción", "San Luis"] },
            { nombre: "Asunción", distritos: ["Asunción", "Bolognesi", "Carhuaz"] },
            { nombre: "Bolognesi", distritos: ["Chiquián", "Huallanca", "La Primavera"] },
            { nombre: "Carhuaz", distritos: ["Carhuaz", "Aczo", "Pariahuanca"] },
            { nombre: "Carlos Fermín Fitzcarrald", distritos: ["San Luis", "San Nicolás", "San Pedro"] },
            { nombre: "Casma", distritos: ["Casma", "Comandante Noel", "Yaután"] },
            { nombre: "Corongo", distritos: ["Corongo", "Cusca", "La Primavera"] },
            { nombre: "Huaraz", distritos: ["Huaraz", "Independencia", "Jangas"] },
            { nombre: "Huari", distritos: ["Huari", "Cajay", "Chavín de Huántar"] },
            { nombre: "Huarmey", distritos: ["Huarmey", "Culebras", "Malvas"] },
            { nombre: "Huaylas", distritos: ["Caraz", "Huallanca", "Yuracmarca"] },
            { nombre: "Mariscal Luzuriaga", distritos: ["Lima", "María Parado de Bellido", "Pampas Chico"] },
            { nombre: "Ocros", distritos: ["Ocros", "Acas", "Anta"] },
            { nombre: "Pallasca", distritos: ["Cabana", "Conchucos", "Huandoval"] },
            { nombre: "Pomabamba", distritos: ["Pomabamba", "Huayllán", "Parobamba"] },
            { nombre: "Recuay", distritos: ["Recuay", "Catac", "Cotaparaco"] },
            { nombre: "Santa", distritos: ["Chimbote", "Nuevo Chimbote", "Coishco"] },
            { nombre: "Sihuas", distritos: ["Sihuas", "Quiches", "Ragash"] },
            { nombre: "Yungay", distritos: ["Yungay", "Mancos", "Matacoto"] }
        ]
    },
    {
        departamento: "Apurímac",
        provincias: [
            { nombre: "Abancay", distritos: ["Abancay", "Circa", "Tamburco"] },
            { nombre: "Andahuaylas", distritos: ["Andahuaylas", "Kishuara", "San Jerónimo"] },
            { nombre: "Antabamba", distritos: ["Antabamba", "El Oro", "Huaquirca"] },
            { nombre: "Aymaraes", distritos: ["Chalhuanca", "Colcabamba", "Cotabambas"] },
            { nombre: "Cotabambas", distritos: ["Tambobamba", "Cotabambas", "Haquira"] },
            { nombre: "Chincheros", distritos: ["Chincheros", "Anco-Huallo", "Oropesa"] },
            { nombre: "Grau", distritos: ["Chuquibambilla", "Curahuasi", "Cachora"] }
        ]
    },
    {
        departamento: "Arequipa",
        provincias: [
            { nombre: "Arequipa", distritos: ["Arequipa", "Cayma", "Yanahuara"] },
            { nombre: "Camaná", distritos: ["Camaná", "Ocoña", "Mariano Nicolás Valcárcel"] },
            { nombre: "Caravelí", distritos: ["Caravelí", "Acarí", "Atico"] },
            { nombre: "Castilla", distritos: ["Castilla", "Tiabaya", "Paucarpata"] },
            { nombre: "Caylloma", distritos: ["Chivay", "Maca", "Cabanaconde"] },
            { nombre: "Condesuyos", distritos: ["Chuquibamba", "Andagua", "Aplao"] },
            { nombre: "Islay", distritos: ["Mollendo", "Islay", "Mejia"] },
            { nombre: "La Unión", distritos: ["Cotahuasi", "Huaynacotas", "Pampamarca"] }
        ]
    }
    // Puedes continuar con los demás departamentos...
];


