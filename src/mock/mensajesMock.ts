import type { MessageItem } from "../types/messages";

export const messagesMock: MessageItem[] = [
    {
        id: "m1",
        from: { id: "u2", name: "María López" },
        preview: "¿Confirmamos la reunión de mañana a las 10am?",
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        read: false,
    },
    {
        id: "m2",
        from: { id: "u3", name: "Carlos Pérez" },
        preview: "Ya subí la propuesta al drive.",
        createdAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
        read: true,
    },
    {
        id: "m3",
        from: { id: "u5", name: "Luis Fernández" },
        preview: "¿Podrías enviarme los detalles del proyecto?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        read: true,
    },
    {
        id: "m4",
        from: { id: "u6", name: "Sofía Martínez" },
        preview: "He actualizado el documento con los últimos cambios.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
        read: false,
    },
    {
        id: "m5",
        from: { id: "u7", name: "Javier Rodríguez" },
        preview: "Nos vemos en la conferencia la próxima semana.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
        read: false,
    },
];