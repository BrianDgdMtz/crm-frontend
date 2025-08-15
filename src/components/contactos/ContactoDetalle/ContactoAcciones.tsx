import ActionBar from "../../ui/actions/ActionBar";
import type { ActionButtonConfig } from "../../ui/actions/types";
import { Edit, Delete, EventNote, Work } from "@mui/icons-material";

interface ContactoCtx {
  id: number;
  empresaId: number;
  nombre?: string;
}

export default function ContactoAcciones(props: {
  context: ContactoCtx;
  handlers: {
    openAgregarActividad: () => void;
    openAgregarDeal: () => void;
    openEditarContacto: () => void;
    onEliminar?: () => void;
  };
  dense?: boolean;
  align?: "left" | "right";
}) {
  const { context, handlers, dense, align } = props;

  const actions: ActionButtonConfig<ContactoCtx>[] = [
    {
      id: "nueva-actividad",
      label: "Nueva Actividad",
      icon: <EventNote />,
      kind: "primary",
      onClick: () => handlers.openAgregarActividad(),
    },
    {
      id: "nuevo-deal",
      label: "Nuevo Deal",
      icon: <Work />,
      kind: "primary",
      onClick: () => handlers.openAgregarDeal(),
    },
    {
      id: "editar-contacto",
      label: "Editar",
      icon: <Edit />,
      kind: "primary",
      onClick: () => handlers.openEditarContacto(),
    },
    {
      id: "eliminar-contacto",
      label: "Eliminar",
      icon: <Delete />,
      kind: "danger",
      onClick: () => handlers.onEliminar?.(),
      confirm: { title: "Eliminar contacto", description: "Esta acción no se puede deshacer.", confirmLabel: "Eliminar" },
    },
  ];

  return <ActionBar actions={actions} context={context} dense={dense} align={align} />;
}
