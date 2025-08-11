export interface estadoDeal {
    id: number;
    nombre: string;
}

export const estadoDealsMock: estadoDeal[] = [
    {
        id: 1,
        nombre: "Abierto",
    },
    {
        id: 2,
        nombre: "Ganado",
    },
    {
        id: 3,
        nombre: "Perdido",
    }
]