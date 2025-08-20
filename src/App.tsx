import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import EmpresasPage from "./pages/EmpresasPage";
import EmpresaDetallePage from "./pages/empresas/EmpresaDetallePage";
import ContactosPage from "./pages/ContactosPage";
import ContactoDetallePage from "./pages/contactos/ContactoDetallePage";
import DealsPage from "./pages/DealsPage";
import DealDetallePage from "./pages/deals/DealDetallePage";
import ActividadesPage from "./pages/ActividadesPage";
import ActividadDetallePage from "./pages/actividades/ActividadDetallePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      {/* Layout envuelve todas las rutas principales */}
       <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="empresas" element={<EmpresasPage />} />
        <Route path="empresas/:id" element={<EmpresaDetallePage />} />
        <Route path="contactos" element={<ContactosPage />} />
        <Route path="contactos/:id" element={<ContactoDetallePage />} />
        <Route path="deals" element= {<DealsPage />} />
        <Route path="deals/:id" element={<DealDetallePage />} />
        <Route path="actividades" element={<ActividadesPage />} />
        <Route path="actividades/:id" element={<ActividadDetallePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
