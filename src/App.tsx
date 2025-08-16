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
        {/* Página principal de empresas */}
        <Route index element={<EmpresasPage />} />
        {/* Detalle de empresa */}
        <Route path="empresas/:id" element={<EmpresaDetallePage />} />
        {/* Rutas placeholder para otros módulos */}
        {/* Página principal de empresas */}
        <Route path="contactos" element={<ContactosPage />} />
        {/* Detalle de contacto */}
        <Route path="contactos/:id" element={<ContactoDetallePage />} />
        <Route path="deals" element= {<DealsPage />} />
        {/* Detalle de deal */}
        <Route path="deals/:id" element={<DealDetallePage />} />
        <Route path="actividades" element={<ActividadesPage />} />
        <Route path="actividades/:id" element={<ActividadDetallePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
