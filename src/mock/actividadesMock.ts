export interface Actividad {
    id: number;
    tipo_id: number;
    asunto: string;
    fecha_programada: string;
    realizada: boolean;
    fecha_realizacion?: string;
    notas?: string;
    usuario_id: number;
    empresa_id: number;
    contacto_id: number;
    deal_id?: number;
    fecha_creacion: string;
    fecha_modificacion?: string;
    modificado_por?: number;
}

export const actividadesMock: Actividad[] = [
    {
        id: 1,
        tipo_id: 1,
        asunto: "Seguimiento de Proyecto",
        fecha_programada: "2023-10-15",
        realizada: true,
        fecha_realizacion: "2023-10-15",
        notas: "Cliente satisfecho con el avance del proyecto.",
        usuario_id: 1,
        empresa_id: 1,
        contacto_id: 1,
        deal_id: 1,
        fecha_creacion: "2023-10-01",
    },
    {
        id: 2,
        tipo_id: 2,
        asunto: "Envío de Propuesta Comercial",
        fecha_programada: "2023-10-20",
        realizada: true,
        notas: "Esperando respuesta del cliente.",
        usuario_id: 2,
        empresa_id: 2,
        contacto_id: 2,
        deal_id: 2,
        fecha_creacion: "2023-10-05",
    },
    {
        id: 3,
        tipo_id: 3,
        asunto: "Reunión de Estrategia de Marketing",
        fecha_programada: "2023-10-25",
        realizada: false,
        notas: "Preparar agenda y objetivos.",
        usuario_id: 3,
        empresa_id: 3,
        contacto_id: 3,
        deal_id: 3,
        fecha_creacion: "2023-10-10",
    },
    {
        id: 4,
        tipo_id: 1,
        asunto: "Visita a la Sucursal",
        fecha_programada: "2023-10-30",
        realizada: false,
        notas: "Revisar instalaciones y hablar con el gerente.",
        usuario_id: 4,
        empresa_id: 4,
        contacto_id: 4,
        deal_id: 4,
        fecha_creacion: "2023-10-12",
    },
    {
        id: 5,
        tipo_id: 2,
        asunto: "Recordatorio de Pago",
        fecha_programada: "2023-11-01",
        realizada: false,
        notas: "Confirmar fecha de pago pendiente.",
        usuario_id: 5,
        empresa_id: 5,
        contacto_id: 5,
        deal_id: 5,
        fecha_creacion: "2023-10-15",
    },
    {
        id: 6,
        tipo_id: 3,
        asunto: "Actualización de Producto",
        fecha_programada: "2023-11-05",
        realizada: true,
        notas: "Informar al cliente sobre nuevas características del producto.",
        usuario_id: 6,
        empresa_id: 6,
        contacto_id: 6,
        deal_id: 6,
        fecha_creacion: "2023-10-20",
    },
    {
        id: 7,
        tipo_id: 4,
        asunto: "Confirmación de Asistencia a Evento",
        fecha_programada: "2023-11-10",
        realizada: true,
        notas: "Esperando confirmación del cliente.",
        usuario_id: 7,
        empresa_id: 7,
        contacto_id: 7,
        deal_id: 7,
        fecha_creacion: "2023-10-25",
    },
    {
        id: 8,
        tipo_id: 5,
        asunto: "Planificación de Campaña Publicitaria",
        fecha_programada: "2023-11-15",
        realizada: true,
        fecha_realizacion: "2023-11-15",
        notas: "Definidos los objetivos y el presupuesto.",
        usuario_id: 8,
        empresa_id: 8,
        contacto_id: 8,
        deal_id: 8,
        fecha_creacion: "2023-10-30",
    },
    {
        id: 9,
        tipo_id: 4,
        asunto: "Seguimiento de Satisfacción del Cliente",
        fecha_programada: "2023-11-20",
        realizada: true,
        notas: "Recoger feedback sobre el servicio recibido.",
        usuario_id: 9,
        empresa_id: 9,
        contacto_id: 9,
        deal_id: 9,
        fecha_creacion: "2023-11-05",
    },
    {
        id: 10,
        tipo_id: 1,
        asunto: "Renovación de Contrato",
        fecha_programada: "2023-11-25",
        realizada: true,
        notas: "Enviar propuesta de renovación al cliente.",
        usuario_id: 10,
        empresa_id: 10,
        contacto_id: 10,
        deal_id: 10,
        fecha_creacion: "2023-11-10",
    }
]