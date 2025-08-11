// src/mock/historialEtapaDealsMock.ts
export interface HistorialEtapaDeal {
  id: number;
  deal_id: number;
  etapa_anterior_id: number | null;
  etapa_nueva_id: number;
  fecha: string;
  usuario_id: number;
}

export const historialEtapaDealsMock: HistorialEtapaDeal[] = [
    // Deal 1
    {
        id: 1,
        deal_id: 1,
        etapa_anterior_id: null,
        etapa_nueva_id: 1,
        fecha: "2023-01-15 09:10:00",
        usuario_id: 1
    },
    {
        id: 2,
        deal_id: 1,
        etapa_anterior_id: 1,
        etapa_nueva_id: 2,
        fecha: "2023-02-03 14:25:00",
        usuario_id: 2
    },
    {
        id: 3,
        deal_id: 1,
        etapa_anterior_id: 2,
        etapa_nueva_id: 3,
        fecha: "2023-03-18 11:40:00",
        usuario_id: 3
    },

    // Deal 2
    {
        id: 4,
        deal_id: 2,
        etapa_anterior_id: null,
        etapa_nueva_id: 1,
        fecha: "2023-02-20 10:00:00",
        usuario_id: 2
    },
    {
        id: 5,
        deal_id: 2,
        etapa_anterior_id: 1,
        etapa_nueva_id: 2,
        fecha: "2023-03-05 16:10:00",
        usuario_id: 4
    },

    // Deal 3
    {
        id: 6,
        deal_id: 3,
        etapa_anterior_id: null,
        etapa_nueva_id: 1,
        fecha: "2023-03-10 08:45:00",
        usuario_id: 3
    },
    {
        id: 7,
        deal_id: 3,
        etapa_anterior_id: 1,
        etapa_nueva_id: 2,
        fecha: "2023-03-22 15:30:00",
        usuario_id: 5
    },
    {
        id: 8,
        deal_id: 3,
        etapa_anterior_id: 2,
        etapa_nueva_id: 3,
        fecha: "2023-04-01 09:05:00",
        usuario_id: 6
    },

    // Deal 4
    {
        id: 9,
        deal_id: 4,
        etapa_anterior_id: null,
        etapa_nueva_id: 1,
        fecha: "2023-04-25 12:00:00",
        usuario_id: 4
    },
    {
        id: 10,
        deal_id: 4,
        etapa_anterior_id: 1,
        etapa_nueva_id: 2,
        fecha: "2023-05-02 13:50:00",
        usuario_id: 7
    },
];
