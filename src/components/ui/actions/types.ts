import type { ReactNode } from "react";

export type ActionKind = "primary" | "secondary" | "danger" | "ghost";

export interface ActionButtonConfig<TContext = any> {
  id: string;
  label: string;
  icon?: ReactNode;
  kind?: ActionKind;
  onClick: (ctx: TContext) => void | Promise<void>;
  confirm?: { title: string; description?: string; confirmLabel?: string };
  visible?: (ctx: TContext) => boolean;
  disabled?: (ctx: TContext) => boolean;
  tooltipWhenDisabled?: string;
  testId?: string;
}
