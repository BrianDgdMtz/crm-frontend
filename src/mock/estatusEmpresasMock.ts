export interface estatusEmpresa {
    id: number;
    nombre: string;
}

export const estatusEmpresasMock: estatusEmpresa[] = [
    {
        id: 1,
        nombre: "Cliente",
    },
    {
        id: 2,
        nombre: "Prospecto",
    },
    {
        id: 3,
        nombre: "Inactivo",
    },
    {
        id: 4,
        nombre: "Suspendido",
    },
    {
        id: 5,
        nombre: "Activo",
    }
]