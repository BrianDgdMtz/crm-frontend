import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContactoHeader from "./ContactoHeader";
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
import { empresasMock } from "../../../mock/empresasMock";
import { estatusContactosMock } from "../../../mock/estatusContactosMock";
import AgregarActividadModal from "../../actividades/AgregarActividadModal";
import AgregarDealModal from "../../deals/AgregarDealModal";
import AgregarContactoModal from "../../contactos/AgregarContactoModal";
import ContactoAcciones from "./ContactoAcciones";

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

type ModalName =
  | "agregar-actividad"
  | "agregar-deal"
  | "editar-contacto"
  | undefined;

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

  const [modal, setModal] = useState<{ name: ModalName }>({ name: undefined });
  const closeModal = () => setModal({ name: undefined });

  const acciones = (
    <ContactoAcciones
      context={{ id: contacto.id, empresaId: empresa?.id ?? contacto.empresa_id }}
      handlers={{
        openAgregarActividad: () => setModal({ name: "agregar-actividad" }),
        openAgregarDeal: () => setModal({ name: "agregar-deal" }),
        openEditarContacto: () => setModal({ name: "editar-contacto" }),
        onEliminar: () => alert("Eliminar Contacto"),
      }}
      align="right"
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
          <Box sx={{ mb: 2, p: 0.5 }}>
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
          <Box sx={{ mb: 3, p: 0.5 }}>
            <ContactoDealsTable
              deals={deals}
              estadoDeals={estadoDeals}
              etapaDeals={etapaDeals}
              onRowClick={(id) => navigate(`/deals/${id}`)}
            />
          </Box>

          <Box sx={{ p: 0.5 }}>
            <ContactoActividadesTable
              actividades={actividades}
              tiposActividad={tiposActividad}
              usuarios={usuarios}
              onRowClick={(id) => navigate(`/actividades/${id}`)}
            />
          </Box>
        </Grid>
      </Grid>

      {modal.name === "agregar-actividad" && (
        <AgregarActividadModal
          key="agregar-actividad"
          open
          onClose={closeModal}
          defaultEmpresaId={empresa?.id ?? contacto.empresa_id}
          defaultContactoId={contacto.id}
          onSave={(actividad) => {
            console.log("Actividad guardada:", actividad);
            alert("Actividad agregada");
            closeModal();
          }}
        />
      )}

      {modal.name === "agregar-deal" && (
        <AgregarDealModal
          key="agregar-deal"
          open
          onClose={closeModal}
          defaultEmpresaId={empresa?.id ?? contacto.empresa_id}
          defaultContactoId={contacto.id}
          onSave={(deal) => {
            console.log("Deal guardado:", deal);
            alert("Deal agregado");
            closeModal();
          }}
        />
      )}

      {modal.name === "editar-contacto" && (
        <AgregarContactoModal
          key="editar-contacto"
          open
          onClose={closeModal}
          onSave={(contactoForm) => {
            console.log("Contacto actualizado/creado:", contactoForm);
            alert("Contacto guardado");
            closeModal();
          }}
          empresas={empresasMock}
          estatusContactos={estatusContactosMock}
          contactoId={contacto.id}
          defaultEmpresaId={empresa?.id ?? contacto.empresa_id}
        />
      )}
    </Box>
  );
};

export default ContactoDetalleView;
