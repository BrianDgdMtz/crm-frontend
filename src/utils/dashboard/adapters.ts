import { toDate, isInLastDays, weekKey, monthKey, monthRange, prevMonthRange, isWithin, pctDelta } from "./date";
import { dealsMock } from "../../mock/dealsMock";
import { usuariosMock } from "../../mock/usuariosMock";
import { tipoActividadMock } from "../../mock/tipoActividadMock";
import { actividadesMock } from "../../mock/actividadesMock";
import { etapaDealsMock } from "../../mock/etapaDealsMock";
import { estadoDealsMock } from "../../mock/estadoDealsMock";
import { empresasMock } from "../../mock/empresasMock";
import { estatusEmpresasMock } from "../../mock/estatusEmpresasMock";
import { industriasMock } from "../../mock/industriasMock";
import { zonasMock } from "../../mock/zonasMock";
import { contactosMock } from "../../mock/contactosMock";
import { estatusContactosMock } from "../../mock/estatusContactosMock";

const sum = (arr: number[]) => arr.reduce((a, b) => a + (b || 0), 0);
const idOf = (obj: any, ...keys: string[]) => keys.map(k => obj?.[k]).find(v => v != null);

const byId = <T extends { id: number }>(list: T[]) =>
  Object.fromEntries(list.map(x => [x.id, x]));

// Helpers de estado
const ID_ABIERTO = estadoDealsMock.find(e => e.nombre === "Abierto")?.id ?? 1;
const ID_GANADO  = estadoDealsMock.find(e => e.nombre === "Ganado")?.id ?? 2;
const ID_PERDIDO = estadoDealsMock.find(e => e.nombre === "Perdido")?.id ?? 3;
const ID_EMPRESA_ACTIVA = estatusEmpresasMock.find(s => s.nombre.toLowerCase().includes("activo"))?.id;

// Helper: fecha “efectiva” de actividad
const effectiveActivityDate = (a: any) =>
  (a.realizada && a.fecha_realizacion) ? a.fecha_realizacion : a.fecha_programada;

// Índices por id (para tolerar mocks con solo ids)
const etapasIdx = byId(etapaDealsMock);
const estadosIdx = byId(estadoDealsMock);
const empresasIdx = byId(empresasMock);

// Normalizadores de nombre (aceptan *_Nombre o *_Id)
function etapaNombre(d: any) {
  return d.etapaNombre
    ?? etapasIdx[idOf(d, "etapaId", "etapa_id")]?.nombre
    ?? "Sin etapa";
}
function estadoNombre(d: any) {
  return d.estadoNombre
    ?? estadosIdx[idOf(d, "estadoId", "estado_id")]?.nombre
    ?? "Sin estado";
}
function empresaNombre(d: any) {
  return d.empresaNombre
    ?? empresasIdx[idOf(d, "empresaId", "empresa_id")]?.nombre
    ?? "Sin empresa";
}
/* Tarjetas KPI's */

/* Valor total del pipeline (deals abiertos) */
export function getKpi_PipelineOpen_Total() {
  const total = dealsMock
    .filter(d => d.estado_id === ID_ABIERTO)
    .reduce((s, d) => s + Number(d.monto_estimado || 0), 0);
  return { total };
}

/* Valor del pipeline del mes actual + Δ% vs mes anterior (nuevos abiertos) */
export function getKpi_PipelineOpen_CurrentMonth() {
  const { start, end } = monthRange();
  const { start: ps, end: pe } = prevMonthRange();
  const curr = dealsMock
    .filter(d => d.estado_id === ID_ABIERTO && isWithin(d.fecha_creacion, start, end))
    .reduce((s, d) => s + Number(d.monto_estimado || 0), 0);
  const prev = dealsMock
    .filter(d => d.estado_id === ID_ABIERTO && isWithin(d.fecha_creacion, ps, pe))
    .reduce((s, d) => s + Number(d.monto_estimado || 0), 0);
  return { value: curr, deltaPct: pctDelta(curr, prev) };
}

/* Valor del pipeline del mes anterior (nuevos abiertos mes previo) */
export function getKpi_PipelineOpen_PrevMonth() {
  const { start: ps, end: pe } = prevMonthRange();
  const prev = dealsMock
    .filter(d => d.estado_id === ID_ABIERTO && isWithin(d.fecha_creacion, ps, pe))
    .reduce((s, d) => s + Number(d.monto_estimado || 0), 0);
  return { value: prev };
}

/* Deals abiertos / ganados / perdidos del mes actual (3 tarjetas) */
export function getKpi_DealsCounts_CurrentMonth() {
  const { start, end } = monthRange();
  const abiertos = dealsMock.filter(d => d.estado_id === ID_ABIERTO && isWithin(d.fecha_creacion, start, end)).length;
  const ganados  = dealsMock.filter(d => d.estado_id === ID_GANADO  && isWithin(d.fecha_creacion, start, end)).length;
  const perdidos = dealsMock.filter(d => d.estado_id === ID_PERDIDO && isWithin(d.fecha_creacion, start, end)).length;
  return { abiertos, ganados, perdidos };
}

/* Actividades realizadas este mes vs pendientes (2 valores) */
export function getKpi_Activities_DoneVsPending_CurrentMonth() {
  const { start, end } = monthRange();
  const acts = actividadesMock.filter(a => isWithin(a.fecha_programada, start, end));
  const realizadas = acts.filter(a => a.realizada).length;
  const pendientes = acts.length - realizadas;
  return { realizadas, pendientes };
}

/* Empresas activas nuevas en el mes */
export function getKpi_NewActiveCompanies_CurrentMonth() {
  const { start, end } = monthRange();
  const isActive = (id: number) => (ID_EMPRESA_ACTIVA ? id === ID_EMPRESA_ACTIVA : true);
  const value = empresasMock.filter(e => isActive(e.estatus_id) && isWithin(e.fecha_alta, start, end)).length;
  return { value };
}

/* Contactos nuevos en el mes */
export function getKpi_NewContacts_CurrentMonth() {
  const { start, end } = monthRange();
  const value = contactosMock.filter(c => isWithin(c.fecha_creacion, start, end)).length;
  return { value };
}

/* Graficas */

/* Pipeline por Etapa (monto y conteo) */
export function getPipelineByStage() {
  const etapas = etapaDealsMock.map(e => e.nombre);
  const montoPorEtapa = etapas.map(et =>
    sum(dealsMock.filter(d => etapaNombre(d) === et).map(d => Number(d.monto_estimado || 0)))
  );
  const countPorEtapa = etapas.map(et =>
    dealsMock.filter(d => etapaNombre(d) === et).length
  );
  return {
    labels: etapas,
    datasetsMonto: [{ label: "Valor del pipeline", data: montoPorEtapa }],
    datasetsCount: [{ label: "Deals", data: countPorEtapa }],
  };
}

/* Deals por Estado */
export function getDealsByState() {
  const estados = estadoDealsMock.map(e => e.nombre);
  const data = estados.map(es =>
    dealsMock.filter(d => estadoNombre(d) === es).length
  );
  return { labels: estados, data };
}

/* Actividades por Tipo (últimos 30 días) */
export function getActivitiesByTypePolar() {
  const counts: Record<string, number> = {};

  actividadesMock.forEach((a) => {
    if (!isInLastDays(a.fecha_programada, 30)) return; 
    const tipo = tipoActividadMock.find(t => t.id === a.tipo_id)?.nombre ?? "Otro";
    counts[tipo] = (counts[tipo] || 0) + 1;
  });

  return {
    labels: Object.keys(counts),
    datasets: [
      {
        data: Object.values(counts),
      },
    ],
  };
}

/* Realizadas vs Pendientes por Semana (últimas 8 semanas) */
export function getActivitiesDoneVsPendingByWeek() {
  const now = new Date();
  const oldest = new Date(now);
  oldest.setDate(now.getDate() - 7 * 8);

  const effectiveDateStr = (a: any) =>
    (a.realizada && a.fecha_realizacion) ? a.fecha_realizacion : a.fecha_programada;

  const weeks = new Set<string>();
  const done: Record<string, number> = {};
  const pending: Record<string, number> = {};

  actividadesMock.forEach(a => {
    const dateStr = effectiveDateStr(a);
    if (!dateStr) return;
    const f = toDate(dateStr);
    if (f < oldest || f > now) return;

    const key = weekKey(f);
    weeks.add(key);

    if (a.realizada) done[key] = (done[key] || 0) + 1;
    else pending[key] = (pending[key] || 0) + 1;
  });

  const labels = Array.from(weeks).sort();
  return {
    labels,
    datasets: [
      { label: "Realizadas", data: labels.map(l => done[l] || 0), stack: "s" },
      { label: "Pendientes", data: labels.map(l => pending[l] || 0), stack: "s" },
    ],
  };
}

/* Top 5 Empresas por Valor Abierto */
export function getTopCompaniesByOpenValue(limit = 5) {
  const abiertos = dealsMock.filter(d => estadoNombre(d).toLowerCase() === "abierto");
  const acc: Record<string, number> = {};
  abiertos.forEach(d => {
    const emp = empresaNombre(d);
    acc[emp] = (acc[emp] || 0) + Number(d.monto_estimado || 0);
  });
  const pairs = Object.entries(acc).sort((a, b) => b[1] - a[1]).slice(0, limit);
  return { labels: pairs.map(p => p[0]), data: pairs.map(p => p[1]) };
}

/* Empresas por Estatus (conteo) */
export function getCompaniesByStatus() {
  const statusById = Object.fromEntries(estatusEmpresasMock.map(e => [e.id, e.nombre]));
  const acc: Record<string, number> = {};
  empresasMock.forEach(e => {
    const name = statusById[(e as any).estatus_id] || "Sin estatus";
    acc[name] = (acc[name] || 0) + 1;
  });
  const labels = Object.keys(acc);
  const data = labels.map(l => acc[l]);
  return { labels, data };
}

/* Evolución mensual de deals cerrados (ganados/perdidos) */
export function getClosedDealsByMonth() {
  // Estados
  const ID_GANADO = estadoDealsMock.find(e => e.nombre === "Ganado")?.id ?? 2;
  const ID_PERDIDO = estadoDealsMock.find(e => e.nombre === "Perdido")?.id ?? 3;

  const accWon: Record<string, number> = {};
  const accLost: Record<string, number> = {};

  dealsMock.forEach(d => {
    if (d.estado_id !== ID_GANADO && d.estado_id !== ID_PERDIDO) return;
    const key = monthKey(d.fecha_creacion);
    if (d.estado_id === ID_GANADO) accWon[key] = (accWon[key] || 0) + 1;
    if (d.estado_id === ID_PERDIDO) accLost[key] = (accLost[key] || 0) + 1;
  });

  const keysAll = Array.from(new Set([...Object.keys(accWon), ...Object.keys(accLost)])).sort();
  const labels = keysAll;

  return {
    labels,
    datasets: [
      { label: "Ganados", data: labels.map(k => accWon[k] || 0) },
      { label: "Perdidos", data: labels.map(k => accLost[k] || 0) },
    ],
  };
}

/* Contactos por estatus (doughnut) */
export function getContactsByStatus() {
  const labels = estatusContactosMock.map(e => e.nombre);
  const counts = estatusContactosMock.map(
    e => contactosMock.filter(c => c.estatus_id === e.id).length
  );

  return { labels, data: counts };
}

/* Contactos nuevos por mes (line) */
export function getNewContactsByMonth() {
  const acc: Record<string, number> = {};
  contactosMock.forEach(c => {
    const key = monthKey(c.fecha_creacion);
    acc[key] = (acc[key] || 0) + 1;
  });

  const labels = Object.keys(acc).sort();
  const data = labels.map(l => acc[l]);

  return {
    labels,
    datasets: [{ label: "Contactos nuevos", data }],
  };
}

/* Contactos Top N con más deals asociados */
export function getTopContactsByDeals(limit = 10) {
  const counter: Record<number, number> = {};
  dealsMock.forEach(d => {
    if (!d.contacto_id) return;
    counter[d.contacto_id] = (counter[d.contacto_id] || 0) + 1;
  });

  const nameById = Object.fromEntries(contactosMock.map(c => [c.id, c.nombre]));

  const pairs = Object.entries(counter)
    .map(([id, count]) => ({ id: Number(id), count }))
    .sort(
      (a, b) =>
        b.count - a.count ||
        String(nameById[a.id]).localeCompare(String(nameById[b.id]))
    )
    .slice(0, limit);

  return {
    labels: pairs.map(p => nameById[p.id] ?? `ID ${p.id}`),
    data: pairs.map(p => p.count),
  };
}

/* Empresas por industria */
export function getCompaniesByIndustry() {
  const labels = industriasMock.map(i => i.nombre);
  const counts = industriasMock.map(i =>
    empresasMock.filter(e => e.industria_id === i.id).length
  );
  return { labels, data: counts };
}

/* Empresas por zona */
export function getCompaniesByZone() {
  const labels = zonasMock.map(z => z.nombre);
  const counts = zonasMock.map(z =>
    empresasMock.filter(e => e.zona_id === z.id).length
  );
  return { labels, data: counts };
}

/*
  Empresas sin actividad en los últimos N días.
  Considera fecha_ultima_actividad; si no existe, usa fecha_alta.
  Retorna lista compacta (ordenada por más inactivas primero).
 */
export function getInactiveCompanies(days = 60, limit = 10) {
  const today = new Date();
  const MS_DAY = 86400000;

  const industriaById = Object.fromEntries(industriasMock.map(i => [i.id, i.nombre]));
  const zonaById = Object.fromEntries(zonasMock.map(z => [z.id, z.nombre]));

  const rows = empresasMock
    .map(e => {
      const refStr = e.fecha_ultima_actividad || e.fecha_alta;
      const refDate = toDate(refStr);
      const diffDays = Math.floor((today.getTime() - refDate.getTime()) / MS_DAY);
      return {
        empresa_id: e.id,
        nombre: e.nombre,
        industria: industriaById[e.industria_id] || "—",
        zona: zonaById[e.zona_id] || "—",
        fecha_ultima_actividad: e.fecha_ultima_actividad ?? e.fecha_alta,
        dias_inactivos: diffDays,
      };
    })
    .filter(r => r.dias_inactivos > days)
    .sort((a, b) => b.dias_inactivos - a.dias_inactivos)
    .slice(0, limit);

  return {
    total: rows.length,
    rows,
  };
}

/* Actividades por usuario (últimos 30 días) */
export function getActivitiesByUserLast30d() {
  const rangeDays = 30;
  const countsByUser: Record<number, number> = {};
  actividadesMock.forEach(a => {
    const ds = effectiveActivityDate(a);
    if (!ds || !isInLastDays(ds, rangeDays)) return;
    countsByUser[a.usuario_id] = (countsByUser[a.usuario_id] || 0) + 1;
  });

  const labels = usuariosMock.map(u => u.nombre);
  const data = usuariosMock.map(u => countsByUser[u.id] || 0);
  return { labels, data };
}

/* Realizadas vs Pendientes por usuario (últimos 30 días) */
export function getActivitiesDoneVsPendingByUserLast30d() {
  const rangeDays = 30;
  const done: Record<number, number> = {};
  const pending: Record<number, number> = {};

  actividadesMock.forEach(a => {
    const ds = effectiveActivityDate(a);
    if (!ds || !isInLastDays(ds, rangeDays)) return;
    if (a.realizada) done[a.usuario_id] = (done[a.usuario_id] || 0) + 1;
    else             pending[a.usuario_id] = (pending[a.usuario_id] || 0) + 1;
  });

  const labels = usuariosMock.map(u => u.nombre);
  const realizadas = usuariosMock.map(u => done[u.id] || 0);
  const pendientes = usuariosMock.map(u => pending[u.id] || 0);

  return {
    labels,
    datasets: [
      { label: "Realizadas", data: realizadas, stack: "s" },
      { label: "Pendientes", data: pendientes, stack: "s" },
    ],
  };
}

/* Valor del pipeline por usuario (solo deals abiertos) */
export function getPipelineValueByUser() {
  const abiertos = dealsMock.filter(d => d.estado_id === ID_ABIERTO);
  const sumByUser: Record<number, number> = {};
  abiertos.forEach(d => {
    sumByUser[d.usuario_id] = (sumByUser[d.usuario_id] || 0) + Number(d.monto_estimado || 0);
  });

  const labels = usuariosMock.map(u => u.nombre);
  const data = usuariosMock.map(u => sumByUser[u.id] || 0);
  return { labels, data };
}

/* Valor del pipeline por zona del usuario (solo abiertos) */
export function getPipelineValueByUserZone() {
  const zonaNameById = Object.fromEntries(zonasMock.map(z => [z.id, z.nombre]));
  const userById = Object.fromEntries(usuariosMock.map(u => [u.id, u]));
  const abiertos = dealsMock.filter(d => d.estado_id === ID_ABIERTO);

  const sumByZone: Record<string, number> = {};
  abiertos.forEach(d => {
    const user = userById[d.usuario_id];
    const zonaName = user ? (zonaNameById[user.zona_id] || "Sin zona") : "Sin zona";
    sumByZone[zonaName] = (sumByZone[zonaName] || 0) + Number(d.monto_estimado || 0);
  });

  const labels = Object.keys(sumByZone);
  const data = labels.map(l => sumByZone[l] || 0);
  return { labels, data };
}

/* Deals ganados vs perdidos por usuario */
export function getWonLostByUser() {
  const wonByUser: Record<number, number> = {};
  const lostByUser: Record<number, number> = {};
  dealsMock.forEach(d => {
    if (d.estado_id === ID_GANADO)  wonByUser[d.usuario_id] = (wonByUser[d.usuario_id] || 0) + 1;
    if (d.estado_id === ID_PERDIDO) lostByUser[d.usuario_id] = (lostByUser[d.usuario_id] || 0) + 1;
  });

  const labels = usuariosMock.map(u => u.nombre);
  const ganados  = usuariosMock.map(u => wonByUser[u.id] || 0);
  const perdidos = usuariosMock.map(u => lostByUser[u.id] || 0);

  return {
    labels,
    datasets: [
      { label: "Ganados", data: ganados, stack: "w" },
      { label: "Perdidos", data: perdidos, stack: "w" },
    ],
  };
}

export default {
  getPipelineByStage,
  getDealsByState,
  getActivitiesByTypePolar,
  getActivitiesDoneVsPendingByWeek,
  getTopCompaniesByOpenValue,
  getCompaniesByStatus,
  getClosedDealsByMonth,
  getContactsByStatus,
  getNewContactsByMonth,
  getTopContactsByDeals,
  getCompaniesByIndustry,
  getCompaniesByZone,
  getInactiveCompanies,
  getActivitiesByUserLast30d,
  getActivitiesDoneVsPendingByUserLast30d,
  getPipelineValueByUser,
  getPipelineValueByUserZone,
  getWonLostByUser,
  getKpi_PipelineOpen_Total,
  getKpi_PipelineOpen_CurrentMonth,
  getKpi_PipelineOpen_PrevMonth,
  getKpi_DealsCounts_CurrentMonth,
  getKpi_Activities_DoneVsPending_CurrentMonth,
  getKpi_NewActiveCompanies_CurrentMonth,
  getKpi_NewContacts_CurrentMonth
};