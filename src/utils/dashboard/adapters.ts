import { toDate, isInLastDays, weekKey } from "./date";

// Mocks
import { dealsMock } from "../../mock/dealsMock";
import { usuariosMock } from "../../mock/usuariosMock";
import { tipoActividadMock } from "../../mock/tipoActividadMock";
import { actividadesMock } from "../../mock/actividadesMock";
import { etapaDealsMock } from "../../mock/etapaDealsMock";
import { estadoDealsMock } from "../../mock/estadoDealsMock";
import { empresasMock } from "../../mock/empresasMock";

const sum = (arr: number[]) => arr.reduce((a, b) => a + (b || 0), 0);
const idOf = (obj: any, ...keys: string[]) => keys.map(k => obj?.[k]).find(v => v != null);
const pick = <T extends object, K extends keyof T>(o: T, k: K) => o?.[k];

const byId = <T extends { id: number }>(list: T[]) =>
  Object.fromEntries(list.map(x => [x.id, x]));

// Índices por id (para tolerar mocks con solo ids)
const etapasIdx = byId(etapaDealsMock);
const estadosIdx = byId(estadoDealsMock);
const usuariosIdx = byId(usuariosMock);
const empresasIdx = byId(empresasMock);
const tiposActIdx = byId(tipoActividadMock);

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
function responsableNombre(d: any) {
  return d.responsableNombre
    ?? usuariosIdx[idOf(d, "responsableId", "responsable_id")]?.nombre
    ?? "Sin asignar";
}
function tipoActividadNombre(a: any) {
  return a.tipoNombre
    ?? tiposActIdx[idOf(a, "tipoId", "tipo_id")]?.nombre
    ?? "Otro";
}

/** 1) Pipeline por Etapa (monto y conteo) */
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

/** 2) Deals por Estado (conteo) */
export function getDealsByState() {
  const estados = estadoDealsMock.map(e => e.nombre);
  const data = estados.map(es =>
    dealsMock.filter(d => estadoNombre(d) === es).length
  );
  return { labels: estados, data };
}

/** 3) Valor del Pipeline por Vendedor (solo abiertos) */
export function getPipelineValueByOwner() {
  const abiertos = dealsMock.filter(d => estadoNombre(d).toLowerCase() === "abierto");
  const owners = usuariosMock.map(u => u.nombre);
  const data = owners.map(o =>
    sum(abiertos.filter(d => responsableNombre(d) === o).map(d => Number(d.monto_estimado || 0)))
  );
  return { labels: owners, data };
}

/** 4) Actividades por Tipo (últimos 30 días, serie temporal) */
export function getActivitiesByTypeLast30d() {
  const tipos = tipoActividadMock.map(t => t.nombre);
  const fechas = new Set<string>();
  const mapa: Record<string, Record<string, number>> = {}; // {fechaKey: {tipo: count}}

  actividadesMock.forEach(a => {
    const f = toDate(pick(a as any, "fecha") || pick(a as any, "fechaProgramada") || new Date());
    if (!isInLastDays(f, 30)) return;
    const key = f.toISOString().slice(0, 10);
    fechas.add(key);
    mapa[key] ||= {};
    const tipo = tipoActividadNombre(a);
    mapa[key][tipo] = (mapa[key][tipo] || 0) + 1;
  });

  const labels = Array.from(fechas).sort();
  const datasets = tipos.map(tipo => ({
    label: tipo,
    data: labels.map(l => mapa[l]?.[tipo] || 0),
  }));
  return { labels, datasets };
}

/** 5) Realizadas vs Pendientes por Semana (últimas 8 semanas) */
export function getActivitiesDoneVsPendingByWeek() {
  const now = new Date();
  const oldest = new Date(now); oldest.setDate(now.getDate() - 7 * 8);

  const weeks = new Set<string>();
  const done: Record<string, number> = {};
  const pending: Record<string, number> = {};

  actividadesMock.forEach(a => {
    const f = toDate(pick(a as any, "fecha") || pick(a as any, "fechaProgramada") || new Date());
    if (f < oldest || f > now) return;
    const key = weekKey(f);
    weeks.add(key);
    const realizada = Boolean((a as any).realizada ?? (a as any).completada ?? false);
    if (realizada) done[key] = (done[key] || 0) + 1;
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

/** 6) Top 5 Empresas por Valor Abierto */
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

/** 7) Empresas por Estatus (conteo) */
export function getCompaniesByStatus() {
  const acc: Record<string, number> = {};
  empresasMock.forEach(e => {
    const estatus =
      (e as any).estatusNombre
      ?? (e as any).estatus
      ?? "Sin estatus";
    acc[estatus] = (acc[estatus] || 0) + 1;
  });
  const labels = Object.keys(acc);
  const data = labels.map(l => acc[l]);
  return { labels, data };
}

// Export default opcional (por conveniencia)
export default {
  getPipelineByStage,
  getDealsByState,
  getPipelineValueByOwner,
  getActivitiesByTypeLast30d,
  getActivitiesDoneVsPendingByWeek,
  getTopCompaniesByOpenValue,
  getCompaniesByStatus,
};