import { useMemo, useState } from "react";
import { Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from "@mui/material";
import type { ActionButtonConfig } from "./types";

interface ActionBarProps<TContext = any> {
  actions: ActionButtonConfig<TContext>[];
  context?: TContext;
  dense?: boolean;
  align?: "left" | "right";
}

export default function ActionBar<TContext>({
  actions, context: ctx, dense = false, align = "right",
}: ActionBarProps<TContext>) {
  const [confirmAction, setConfirmAction] = useState<ActionButtonConfig<TContext> | null>(null);

  const computed = useMemo(
    () => actions
      .filter(a => (a.visible ? a.visible(ctx!) : true))
      .map(a => ({ ...a, isDisabled: a.disabled ? a.disabled(ctx!) : false })),
    [actions, ctx]
  );

  const size = dense ? "small" : "medium";
  const justifyContent = align === "left" ? "flex-start" : "flex-end";

  const kindToVariant: Record<string, "contained" | "outlined" | "text"> = {
    primary: "contained", secondary: "outlined", danger: "contained", ghost: "text",
  };
  const kindToColor: Record<string, "primary" | "secondary" | "error" | "inherit"> = {
    primary: "primary", secondary: "secondary", danger: "error", ghost: "inherit",
  };

  const handleClick = async (a: ActionButtonConfig<TContext>) => {
    if (a.confirm) { setConfirmAction(a); return; }
    await a.onClick(ctx!);
  };

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent={justifyContent}>
        {computed.map(a => {
          const btn = (
            <Button
              key={a.id}
              size={size}
              variant={kindToVariant[a.kind ?? "secondary"]}
              color={kindToColor[a.kind ?? "secondary"]}
              startIcon={a.icon}
              onClick={() => handleClick(a)}
              disabled={a.isDisabled}
              data-testid={a.testId ?? `action-${a.id}`}
            >
              {a.label}
            </Button>
          );
          return a.isDisabled && a.tooltipWhenDisabled ? (
            <Tooltip key={a.id} title={a.tooltipWhenDisabled} arrow>
              <span>{btn}</span>
            </Tooltip>
          ) : btn;
        })}
      </Stack>

      <Dialog open={!!confirmAction} onClose={() => setConfirmAction(null)}>
        <DialogTitle>{confirmAction?.confirm?.title}</DialogTitle>
        {!!confirmAction?.confirm?.description && (
          <DialogContent>{confirmAction?.confirm?.description}</DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setConfirmAction(null)}>Cancelar</Button>
          <Button
            color="error" variant="contained"
            onClick={async () => {
              const a = confirmAction!;
              setConfirmAction(null);
              await a.onClick(ctx!);
            }}
          >
            {confirmAction?.confirm?.confirmLabel ?? "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
