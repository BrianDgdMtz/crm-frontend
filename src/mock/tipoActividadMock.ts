export interface tipoActividad {
    id: number;
    nombre: string;
}

export const tipoActividadMock: tipoActividad[] = [
    {
        id: 1,
        nombre: "Llamada",
    },
    {
        id: 2,
        nombre: "Correo",
    },
    {
        id: 3,
        nombre: "Reunión",
    },
    {
        id: 4,
        nombre: "Visita presencial",
    },
    {
        id: 5,
        nombre: "Mensaje via WhatsApp",
    },
];