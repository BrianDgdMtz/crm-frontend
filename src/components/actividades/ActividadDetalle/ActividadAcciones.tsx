import ActionBar from "../../ui/actions/ActionBar";
import type { ActionButtonConfig } from "../../ui/actions/types";
import { Edit, Delete } from "@mui/icons-material";

interface ActividadCtx {
  id: number;
  asunto?: string;
}

export default function ActividadAcciones(props: {
  context: ActividadCtx;
  handlers: {
    openEditar: () => void;
    onEliminar?: () => void;
  };
  dense?: boolean;
  align?: "left" | "right";
}) {
  const { handlers, dense, align, context } = props;

  const actions: ActionButtonConfig<ActividadCtx>[] = [
    {
      id: "editar-actividad",
      label: "Editar",
      icon: <Edit />,
      kind: "primary",
      onClick: () => handlers.openEditar(),
    },
    {
      id: "eliminar-actividad",
      label: "Eliminar",
      icon: <Delete />,
      kind: "danger",
      onClick: () => handlers.onEliminar?.(),
      confirm: { title: "Eliminar actividad", description: "Esta acción no se puede deshacer.", confirmLabel: "Eliminar" },
    },
  ];

  return <ActionBar actions={actions} context={context} dense={dense} align={align} />;
}
