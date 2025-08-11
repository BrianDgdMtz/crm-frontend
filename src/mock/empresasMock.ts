export interface Empresa {
    id: number;
    nombre: string;
    industria_id: number;
    zona_id: number;
    estatus_id: number;
    fecha_alta: string;
    rfc: string;
    fecha_ultima_actividad?: string;
}

export const empresasMock: Empresa[] = [
    {
        id: 1,
        nombre: "Grupo Omega",
        industria_id: 1, // ID de la industria relacionada
        zona_id: 1, // ID de la zona relacionada
        estatus_id: 1, // ID del estatus relacionado
        fecha_alta: "2023-01-15",
        rfc: "OME123456789",
        fecha_ultima_actividad: "2023-10-01",
    },
    {
        id: 2,
        nombre: "Tecnologías Avanzadas",
        industria_id: 2,
        zona_id: 2,
        estatus_id: 2,
        fecha_alta: "2023-02-20",
        rfc: "TEC987654321",
        fecha_ultima_actividad: "2023-09-15",
    },
    {
        id: 3,
        nombre: "Alimentos Frescos S.A.",
        industria_id: 3,
        zona_id: 3,
        estatus_id: 3,
        fecha_alta: "2023-03-10",
        rfc: "ALF456789123",
        fecha_ultima_actividad: "2023-10-05",
    },
    {
        id: 4,
        nombre: "Servicios Financieros Globales",
        industria_id: 4,
        zona_id: 4,
        estatus_id: 4,
        fecha_alta: "2023-04-25",
        rfc: "SFG321654987",
        fecha_ultima_actividad: "2023-10-10",
    },
    {
        id: 5,
        nombre: "Logística y Transporte Express",
        industria_id: 5,
        zona_id: 2,
        estatus_id: 5,
        fecha_alta: "2023-05-30",
        rfc: "LTE789123456",
        fecha_ultima_actividad: "2023-09-20",
    },
    {
        id: 6,
        nombre: "Energía Renovable Sostenible",
        industria_id: 6,
        zona_id: 1,
        estatus_id: 6,
        fecha_alta: "2023-06-15",
        rfc: "ERS654321789",
        fecha_ultima_actividad: "2023-10-12",
    },
    {
        id: 7,
        nombre: "Salud y Bienestar Integral",
        industria_id: 7,
        zona_id: 4,
        estatus_id: 7,
        fecha_alta: "2023-07-05",
        rfc: "SBI123789456",
        fecha_ultima_actividad: "2023-10-08",
    },
    {
        id: 8,
        nombre: "Educación y Capacitación Avanzada",
        industria_id: 8,
        zona_id: 3,
        estatus_id: 8,
        fecha_alta: "2023-08-20",
        rfc: "ECA987321654",
        fecha_ultima_actividad: "2023-09-30",
    },
    {
        id: 9,
        nombre: "Turismo y Hospitalidad Global",
        industria_id: 9,
        zona_id: 1,
        estatus_id: 9,
        fecha_alta: "2023-09-10",
        rfc: "THG456123789",
        fecha_ultima_actividad: "2023-10-15",
    },
    {
        id: 10,
        nombre: "Innovación y Desarrollo Tecnológico",
        industria_id: 10,
        zona_id: 3,
        estatus_id: 10,
        fecha_alta: "2023-10-01",
        rfc: "IDT321987654",
        fecha_ultima_actividad: "2023-10-20",
    },
];
