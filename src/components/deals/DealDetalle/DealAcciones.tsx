import ActionBar from "../../ui/actions/ActionBar";
import type { ActionButtonConfig } from "../../ui/actions/types";
import { Edit, Description, EventNote, Delete } from "@mui/icons-material";

interface DealCtx {
  dealId: number;
  empresaId: number;
  contactoId?: number | null;
  titulo?: string;
}

export default function DealAcciones(props: {
  context: DealCtx;
  handlers: {
    openEditarDeal: () => void;
    openCrearActividad: () => void;
    onEliminar?: () => void;
  };
  dense?: boolean;
  align?: "left" | "right";
}) {
  const { handlers, dense, align, context } = props;

  const actions: ActionButtonConfig<DealCtx>[] = [
    {
      id: "editar-deal",
      label: "Editar deal",
      icon: <Edit />,
      kind: "primary",
      onClick: () => handlers.openEditarDeal(),
    },
    {
      id: "crear-cotizacion",
      label: "Crear cotización",
      icon: <Description />,
      kind: "primary",
      disabled: () => true,
      tooltipWhenDisabled: "Disponible más adelante",
      onClick: () => {},
    },
    {
      id: "crear-actividad",
      label: "Crear actividad",
      icon: <EventNote />,
      kind: "primary",
      onClick: () => handlers.openCrearActividad(),
    },
    {
      id: "eliminar-deal",
      label: "Eliminar",
      icon: <Delete />,
      kind: "danger",
      onClick: () => handlers.onEliminar?.(),
      confirm: { title: "Eliminar deal", description: "Esta acción no se puede deshacer.", confirmLabel: "Eliminar" },
    },
  ];

  return <ActionBar actions={actions} context={context} dense={dense} align={align} />;
}
