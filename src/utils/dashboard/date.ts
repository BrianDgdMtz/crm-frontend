/* Formateo básico */

/* YYYY-MM-DD (zona local) */
export const toYMD = (d: Date) => d.toISOString().slice(0, 10);

/* dd/mm/yyyy */
export function formatDate(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/* Nombre de mes en formato largo (ej. “enero”) */
export function getMonthName(idx: number, locale = "es-MX") {
  const base = new Date(2000, idx, 1);
  return base.toLocaleString(locale, { month: "long" });
}

/* Nombre corto de mes (ej. “ene”) */
export function getMonthShortName(idx: number, locale = "es-MX") {
  const base = new Date(2000, idx, 1);
  return base.toLocaleString(locale, { month: "short" });
}

/* Convierte "YYYY-MM-DD" a Date (a medianoche local) */
export function parseYMD(ymd: string) {
  return new Date(ymd + "T00:00:00");
}

/* Rangos y navegación por meses */

export function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
export function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
export function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

/* dateStr (YYYY-MM-DD) está en [start, end] */
export function isWithin(dateStr: string, start: Date, end: Date) {
  const d = parseYMD(dateStr);
  const endDay = new Date(end);
  endDay.setHours(23, 59, 59, 999);
  return d >= start && d <= endDay;
}

/* Rango del mes actual del sistema */
export function monthRange(ref?: Date) {
  const base = ref ?? new Date();
  const start = startOfMonth(base);
  const end = endOfMonth(base);
  return { start, end };
}

/* Rango del mes anterior a ref */
export function prevMonthRange(ref?: Date) {
  const base = ref ?? new Date();
  const prev = addMonths(startOfMonth(base), -1);
  const start = startOfMonth(prev);
  const end = endOfMonth(prev);
  return { start, end };
}

/* Métricas / agregaciones */

/** Δ% = (curr - prev) / prev * 100. Si prev = 0, devuelve 100 si curr>0, si no 0. */
export function pctDelta(curr: number, prev: number) {
  if (!prev) return curr > 0 ? 100 : 0;
  return ((curr - prev) / prev) * 100;
}

/** Clave mensual “YYYY-MM” para agrupar por mes */
export function monthKey(d: Date | string) {
  const date = typeof d === "string" ? parseYMD(d) : d;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/* Etiqueta “Mes YYYY” */
export function monthLabelES(d: Date | string, locale = "es-MX") {
  const date = typeof d === "string" ? parseYMD(d) : d;
  const m = date.toLocaleString(locale, { month: "long" });
  return `${m} ${date.getFullYear()}`;
}

/*
  Devuelve un arreglo de claves “YYYY-MM” entre start y end,
  útil para ejes X de tendencias mensuales.
*/
export function monthsBetween(start: Date, end: Date) {
  const arr: string[] = [];
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const limit = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cursor <= limit) {
    arr.push(monthKey(cursor));
    cursor = addMonths(cursor, 1);
  }
  return arr;
}

/* Helpers adicionales usados en adapters */

/* Convierte "YYYY-MM-DD" a Date */
export function toDate(dateStr: string) {
  return parseYMD(dateStr);
}

/* Devuelve true si la fecha (YYYY-MM-DD) está dentro de los últimos `days` días respecto a hoy */
export function isInLastDays(dateStr: string, days: number) {
  const d = parseYMD(dateStr);
  const today = new Date();
  const limit = new Date();
  limit.setDate(today.getDate() - days);
  return d >= limit && d <= today;
}

/* Clave semanal "YYYY-W##" */
export function weekKey(date: Date | string) {
  const d = typeof date === "string" ? parseYMD(date) : date;
  const thursday = new Date(d.getTime());
  thursday.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(thursday.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((+thursday - +yearStart) / 86400000 + 1) / 7);
  return `${thursday.getFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}
