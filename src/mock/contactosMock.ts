export interface Contacto {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    posicion: string;
    empresa_id: number;
    estatus_id: number;
    fecha_creacion: string;
    notas?: string;
}

export const contactosMock: Contacto[] = [
    {
        id: 1,
        nombre: "Juan Pérez",
        correo: "juan.perez@outlook.com",
        telefono: "555-123-4362",
        posicion: "Gerente de Ventas",
        empresa_id: 1,
        estatus_id: 1,
        fecha_creacion: "2023-01-10",
        notas: "Cliente frecuente, interesado en nuevos productos.",
    },
    {
        id: 2,
        nombre: "María López",
        correo: "maria_lopez@gmail.com",
        telefono: "555-987-6543",
        posicion: "Directora de Marketing",
        empresa_id: 2,
        estatus_id: 2,
        fecha_creacion: "2023-02-15",
        notas: "Interesada en campañas de publicidad digital.",
    },
    {
        id: 3,
        nombre: "Carlos García",
        correo: "carlos_garcia23@yahoo.com",
        telefono: "555-456-7890",
        posicion: "Analista Financiero",
        empresa_id: 3,
        estatus_id: 3,
        fecha_creacion: "2023-03-20",
        notas: "No ha respondido a los últimos correos.",
    },
    {
        id: 4,
        nombre: "Ana Torres",
        correo: "torres.ana@gmail.com",
        telefono: "555-654-3210",
        posicion: "Coordinadora de Proyectos",
        empresa_id: 4,
        estatus_id: 4,
        fecha_creacion: "2023-04-05",
        notas: "Reunión programada para la próxima semana.",
    },
    {
        id: 5,
        nombre: "Luis Fernández",
        correo: "lucho.fdz33@outlook.com",
        telefono: "555-321-6549",
        posicion: "Jefe de Compras",
        empresa_id: 5,
        estatus_id: 5,
        fecha_creacion: "2023-05-12",
        notas: "Solicitó información sobre precios y disponibilidad.",
    },
    {
        id: 6,
        nombre: "Sofía Martínez",
        correo: "sofi_mtz@outlook.com",
        telefono: "555-789-1234",
        posicion: "Especialista en Recursos Humanos",
        empresa_id: 6,
        estatus_id: 6,
        fecha_creacion: "2023-06-18",
        notas: "Interesada en soluciones de capacitación para empleados.",
    },
    {
        id: 7,
        nombre: "Diego Ramírez",
        correo: "diego_ramirez@gmail.com",
        telefono: "555-234-5678",
        posicion: "Director de Tecnología",
        empresa_id: 7,
        estatus_id: 7,
        fecha_creacion: "2023-07-22",
        notas: "No ha respondido a las últimas propuestas.",
    },
    {
        id: 8,
        nombre: "Laura Sánchez",
        correo: "lau.sanchez57@yahoo.com",
        telefono: "555-876-5432",
        posicion: "Gerente de Operaciones",
        empresa_id: 8,
        estatus_id: 8,
        fecha_creacion: "2023-08-30",
        notas: "Requiere seguimiento sobre el último pedido.",
    },
    {
        id: 9,
        nombre: "Andrés Jiménez",
        correo: "andy.jimenez44@gmail.com",
        telefono: "555-345-6789",
        posicion: "Consultor de Estrategia",
        empresa_id: 9,
        estatus_id: 9,
        fecha_creacion: "2023-09-10",
        notas: "Interesado en servicios de consultoría estratégica.",
    },
    {
        id: 10,
        nombre: "Patricia Ruiz",
        correo: "paty_ruiz23@gmail.com",
        telefono: "555-678-1234",
        posicion: "Directora de Proyectos",
        empresa_id: 10,
        estatus_id: 10,
        fecha_creacion: "2023-10-01",
        notas: "Reunión programada para discutir nuevos proyectos.",
    },
];