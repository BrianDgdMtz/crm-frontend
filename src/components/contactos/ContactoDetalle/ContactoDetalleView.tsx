import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContactoHeader from "./ContactoHeader";
import ContactoAcciones from "./ContactoAcciones";
import ContactoInfoPanel from "./ContactoInfoPanel";
import ContactoDealsTable from "./ContactoDealsTable";
import ContactoActividadesTable from "./ContactoActividadesTable";
import type { Contacto } from "../../../mock/contactosMock";
import type { Empresa } from "../../../mock/empresasMock";
import type { Industria } from "../../../mock/industriasMock";
import type { Zona } from "../../../mock/zonasMock";
import type { estatusContacto } from "../../../mock/estatusContactosMock";
import type { Deal } from "../../../mock/dealsMock";
import type { Actividad } from "../../../mock/actividadesMock";
import type { estadoDeal } from "../../../mock/estadoDealsMock";
import type { etapaDeal } from "../../../mock/etapaDealsMock";
import type { tipoActividad } from "../../../mock/tipoActividadMock";
import type { Usuario } from "../../../mock/usuariosMock";

interface ContactoDetalleViewProps {
  contacto: Contacto;
  empresa?: Empresa;
  industria?: Industria | null;
  zona?: Zona | null;
  estatus?: estatusContacto | null;
  deals: Deal[];
  actividades: Actividad[];
  estadoDeals?: estadoDeal[];
  etapaDeals?: etapaDeal[];
  tiposActividad?: tipoActividad[];
  usuarios?: Usuario[];
}

const ContactoDetalleView: React.FC<ContactoDetalleViewProps> = ({
  contacto,
  empresa,
  industria,
  zona,
  estatus,
  deals,
  actividades,
  estadoDeals = [],
  etapaDeals = [],
  tiposActividad = [],
  usuarios = [],
}) => {
  const navigate = useNavigate();

  const acciones = (
    <ContactoAcciones
      onNuevaActividad={() => alert("Agregar actividad")}
      onEditarContacto={() => alert("Editar contacto")}
      onNuevoDeal={() => alert("Nuevo Deal")}
      onEliminarContacto={() => alert("Eliminar Contacto")}
    />
  );

  return (
    <Box>
      <ContactoHeader
        nombre={contacto.nombre}
        onVolver={() => navigate("/contactos")}
        acciones={acciones}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ mb: 3, p: 1 }}>
            <ContactoInfoPanel
              contacto={contacto}
              empresa={empresa}
              industria={industria}
              zona={zona}
              estatus={estatus}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ mb: 3, p: 1 }}>
            <ContactoDealsTable
              deals={deals}
              estadoDeals={estadoDeals}
              etapaDeals={etapaDeals}
              onRowClick={(id) => navigate(`/deals/${id}`)}
            />
          </Box>

          <Box sx={{ p: 1 }}>
            <ContactoActividadesTable
              actividades={actividades}
              tiposActividad={tiposActividad}
              usuarios={usuarios}
              onRowClick={(id) => navigate(`/actividades/${id}`)}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactoDetalleView;
