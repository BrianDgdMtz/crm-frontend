export const toDate = (input: string | number | Date) =>
  input instanceof Date ? input : new Date(input);

export function isInLastDays(date: Date, days = 30) {
  const now = new Date();
  const lim = new Date(now);
  lim.setDate(now.getDate() - days);
  return date >= lim && date <= now;
}

export function weekKey(d: Date) {
  const iso = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = iso.getUTCDay() || 7;
  iso.setUTCDate(iso.getUTCDate() - day + 1);
  return iso.toISOString().slice(0, 10);
}