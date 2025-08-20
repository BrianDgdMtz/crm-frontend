export function formatCurrencyShort(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)} mill.`;
  if (abs >= 1_000)     return `$${(n / 1_000).toFixed(1)} mil`;
  return `$${n.toLocaleString()}`;
}

export function formatPercent(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}
