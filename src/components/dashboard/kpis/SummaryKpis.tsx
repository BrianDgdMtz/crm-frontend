// import KpiCard from "./KpiCard";
// import {
//   getPipelineOpenValue,
//   getDealsCountByStatus,
//   getActivitiesThisMonthStats,
//   getNewActiveCompaniesThisMonth,
//   getNewContactsThisMonth,
// } from "../../../utils/dashboard/adapters";

// export default function SummaryKpis() {
//   const pipeline = getPipelineOpenValue();
//   const deals = getDealsCountByStatus();
//   const acts = getActivitiesThisMonthStats();
//   const newCompanies = getNewActiveCompaniesThisMonth();
//   const newContacts = getNewContactsThisMonth();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
//       <KpiCard
//         title="Valor total del pipeline"
//         value={`$${pipeline.total.toLocaleString()} MXN`}
//         deltaPct={pipeline.deltaPct}
//         icon={"💰"}
//         subtitle="Suma de monto_estimado en deals abiertos"
//       />
//       <KpiCard
//         title="Deals abiertos"
//         value={deals.abiertos.value}
//         deltaPct={deals.abiertos.deltaPct}
//         icon={"📂"}
//       />
//       <KpiCard
//         title="Deals ganados"
//         value={deals.ganados.value}
//         deltaPct={deals.ganados.deltaPct}
//         icon={"🏆"}
//       />
//       <KpiCard
//         title="Deals perdidos"
//         value={deals.perdidos.value}
//         deltaPct={deals.perdidos.deltaPct}
//         icon={"🗑️"}
//       />
//       {/* Puedes agrupar actividades / empresas / contactos en otra fila si prefieres */}
//       <div className="col-span-1 md:col-span-2 xl:col-span-5 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-4">
//         <KpiCard
//           title="Actividades realizadas (mes)"
//           value={acts.realizadas.value}
//           deltaPct={acts.realizadas.deltaPct}
//           icon={"✅"}
//         />
//         <KpiCard
//           title="Actividades pendientes (mes)"
//           value={acts.pendientes.value}
//           deltaPct={acts.pendientes.deltaPct}
//           icon={"⏳"}
//         />
//         <KpiCard
//           title="Empresas activas nuevas (mes)"
//           value={newCompanies.value}
//           deltaPct={newCompanies.deltaPct}
//           icon={"🏢"}
//         />
//         <KpiCard
//           title="Contactos nuevos (mes)"
//           value={newContacts.value}
//           deltaPct={newContacts.deltaPct}
//           icon={"👤"}
//         />
//       </div>
//     </div>
//   );
// }