import type { NotificationItem } from "../types/notifications";

export const notificationsMock: NotificationItem[] = [
    {
        id: "n1",
        type: "activity",
        title: "Nueva actividad asignada",
        subtitle: "Llamada de seguimiento a Empresa Atlas",
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        read: false,
        href: "/actividades/3",
    },
    {
        id: "n2",
        type: "deal",
        title: "Deal movido a 'Propuesta'",
        subtitle: "Global Nova — Renovación de Contrato",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        read: false,
        href: "/deals/88",
    },
    {
        id: "n3",
        type: "system",
        title: "Actualización del sistema",
        subtitle: "Se aplicaron mejoras de rendimiento",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        read: true,
    },
    {
        id: "n4",
        type: "deal",
        title: "Nuevo deal creado",
        subtitle: "Holding Globales — Suministro de Alimentos",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: false,
        href: "/deals/89",
    },
    {
        id: "n5",
        type: "activity",
        title: "Actividad completada",
        subtitle: "Email enviado a Industrias Pulsar",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        read: true,
        href: "/actividades/13",
    },
];