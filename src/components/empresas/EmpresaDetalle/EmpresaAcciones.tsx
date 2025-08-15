import ActionBar from "../../ui/actions/ActionBar";
import type { ActionButtonConfig } from "../../ui/actions/types";
import { PersonAdd, Edit, Delete, Work, EventNote } from "@mui/icons-material";

interface EmpresaCtx {
  id: number;
  nombre: string;
}

interface EmpresaAccionesProps {
  context: EmpresaCtx;
  handlers: {
    openAgregarActividad: (initial: { empresaId: number }) => void;
    openAgregarDeal: (initial: { empresaId: number }) => void;
    openAgregarEmpresa: (initial: { empresaId: number }) => void;
    openAgregarContacto: (initial: { empresaId: number }) => void;
    onEliminar?: () => void;
  };
  dense?: boolean;
  align?: "left" | "right";
}

export default function EmpresaAcciones({ context, handlers, dense, align }: EmpresaAccionesProps) {
  const actions: ActionButtonConfig<EmpresaCtx>[] = [
    {
      id: "nueva-actividad",
      label: "Nueva Actividad",
      icon: <EventNote />,
      kind: "primary",
      onClick: ({ id }) => handlers.openAgregarActividad({ empresaId: id }),
    },
    {
      id: "nuevo-deal",
      label: "Nuevo Deal",
      icon: <Work />,
      kind: "primary",
      onClick: ({ id }) => handlers.openAgregarDeal({ empresaId: id }),
    },
    {
      id: "editar-empresa",
      label: "Editar Empresa",
      icon: <Edit />,
      kind: "primary",
      onClick: ({ id }) => handlers.openAgregarEmpresa({ empresaId: id }),
    },
    {
      id: "agregar-contacto",
      label: "Agregar Contacto",
      icon: <PersonAdd />,
      kind: "primary",
      onClick: ({ id }) => handlers.openAgregarContacto({ empresaId: id }),
    },
    {
      id: "eliminar",
      label: "Eliminar",
      icon: <Delete />,
      kind: "danger",
      onClick: () => handlers.onEliminar?.(),
      confirm: { title: "Eliminar empresa", description: "Esta acción no se puede deshacer.", confirmLabel: "Eliminar" },
    },
  ];

  return <ActionBar actions={actions} context={context} dense={dense} align={align} />;
}