export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    contraseña: string;
    rol: string;
    estado: string;
    fecha_creacion: string;
    zona_id: number;
}

export const usuariosMock: Usuario[] = [
    {
        id: 1,
        nombre: "Manuel Castillo",
        email: "jorge.castillo@empresa.com",
        contraseña: "password123",
        rol: "Ejecutivo de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-01-01",
        zona_id: 1,
    },
    {
        id: 2,
        nombre: "Ana Gómez",
        email: "ana.gomez@empresa.com",
        contraseña: "password456",
        rol: "Gerente de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-02-01",
        zona_id: 2,
    },
    {
        id: 3,
        nombre: "Luis Martínez",
        email: "luis.martinez@empresa.com",
        contraseña: "password789",
        rol: "Ejecutivo de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-03-01",
        zona_id: 1,
    },
    {
        id: 4,
        nombre: "María López",
        email: "maria.lopez@empresa.com",
        contraseña: "password101",
        rol: "Gerente de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-04-01",
        zona_id: 3,
    },
    {
        id: 5,
        nombre: "Carlos Sánchez",
        email: "carlos.sanchez@empresa.com",
        contraseña: "password202",
        rol: "Ejecutivo de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-05-01",
        zona_id: 2,
    },
    {
        id: 6,
        nombre: "Laura Torres",
        email: "laura.torres@empresa.com",
        contraseña: "password303",
        rol: "Gerente de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-06-01",
        zona_id: 1,
    },
    {
        id: 7,
        nombre: "Pedro Ramírez",
        email: "pedro.ramirez@empresa.com",
        contraseña: "password404",
        rol: "Ejecutivo de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-07-01",
        zona_id: 3,
    },
    {
        id: 8,
        nombre: "Sofía Díaz",
        email: "sofia.diaz@empresa.com",
        contraseña: "password505",
        rol: "Gerente de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-08-01",
        zona_id: 2,
    },
    {
        id: 9,
        nombre: "Andrés Herrera",
        email: "andres.herrera@empresa.com",
        contraseña: "password606",
        rol: "Ejecutivo de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-09-01",
        zona_id: 1,
    },
    {
        id: 10,
        nombre: "Clara Jiménez",
        email: "clara.jimenez@empresa.com",
        contraseña: "password707",
        rol: "Gerente de Ventas",
        estado: "Activo",
        fecha_creacion: "2023-10-01",
        zona_id: 3,
    }
]