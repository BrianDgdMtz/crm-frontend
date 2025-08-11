export interface estatusContacto {
    id: number;
    nombre: string;
}

export const estatusContactosMock: estatusContacto[] = [
    {
        id: 1,
        nombre: "Activo",
    },
    {
        id: 2,
        nombre: "Inactivo",
    },
    {
        id: 3,
        nombre: "Pendiente",
    },
    {
        id: 4,
        nombre: "Suspendido",
    },
    {
        id: 5,
        nombre: "Eliminado",
    },
    {
        id: 6,
        nombre: "Prospecto",
    },
    {
        id: 7,
        nombre: "Cliente",
    },
    {
        id: 8,
        nombre: "Lead Calificado",
    },
    {
        id: 9,
        nombre: "Lead No Calificado",
    },
    {
        id: 10,
        nombre: "En Seguimiento",
    }
]