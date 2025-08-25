import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EmpresasPage from "./pages/EmpresasPage";
import EmpresaDetallePage from "./pages/empresas/EmpresaDetallePage";
import ContactosPage from "./pages/ContactosPage";
import ContactoDetallePage from "./pages/contactos/ContactoDetallePage";
import DealsPage from "./pages/DealsPage";
import DealDetallePage from "./pages/deals/DealDetallePage";
import ActividadesPage from "./pages/ActividadesPage";
import ActividadDetallePage from "./pages/actividades/ActividadDetallePage";
import BootScreen from "./pages/BootScreen";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* --- Ruta pública --- */}
      <Route path="/login" element={<LoginPage />} />

      {/* --- Bloque protegido por autenticación --- */}
      <Route element={<PrivateRoute />}>
      <Route path="boot" element={<BootScreen />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="empresas" element={<EmpresasPage />} />
          <Route path="empresas/:id" element={<EmpresaDetallePage />} />
          <Route path="contactos" element={<ContactosPage />} />
          <Route path="contactos/:id" element={<ContactoDetallePage />} />
          <Route path="deals" element={<DealsPage />} />
          <Route path="deals/:id" element={<DealDetallePage />} />
          <Route path="actividades" element={<ActividadesPage />} />
          <Route path="actividades/:id" element={<ActividadDetallePage />} />
          {/* Fallback dentro del layout */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
