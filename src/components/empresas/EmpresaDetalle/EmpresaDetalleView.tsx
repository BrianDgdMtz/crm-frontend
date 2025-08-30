import React, { useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import EmpresaHeader from "./EmpresaHeader";
import EmpresaInfoPanel from "./EmpresaInfoPanel";
import EmpresaContactosTable from "./EmpresaContactosTable";
import EmpresaActividadesTable from "./EmpresaActividadesTable";
import EmpresaDealsTable from "./EmpresaDealsTable";
import EmpresaAcciones from "./EmpresaAcciones";
import { contactosMock } from "../../../mock/contactosMock";
import { actividadesMock } from "../../../mock/actividadesMock";
import { dealsMock } from "../../../mock/dealsMock";
import { industriasMock } from "../../../mock/industriasMock";
import { estatusEmpresasMock } from "../../../mock/estatusEmpresasMock";
import { zonasMock } from "../../../mock/zonasMock";
import type { Empresa } from "../../../mock/empresasMock";
import { empresasMock } from "../../../mock/empresasMock";
import { estatusContactosMock } from "../../../mock/estatusContactosMock";
import AgregarActividadModal from "../../actividades/AgregarActividadModal";
import AgregarDealModal from "../../deals/AgregarDealModal";
import AgregarEmpresaModal from "../AgregarEmpresaModal";
import AgregarContactoModal from "../../contactos/AgregarContactoModal";

interface EmpresaDetalleViewProps {
  empresa: Empresa;
  onEliminar?: () => void;
}

type ModalName =
  | "agregar-actividad"
  | "agregar-deal"
  | "editar-empresa"
  | "agregar-contacto"
  | undefined;

const EmpresaDetalleView: React.FC<EmpresaDetalleViewProps> = ({ empresa, onEliminar }) => {
  const navigate = useNavigate();

  const contactosEmpresa = contactosMock.filter((c) => c.empresa_id === empresa.id);
  const actividadesEmpresa = actividadesMock.filter((a) => a.empresa_id === empresa.id);
  const dealsEmpresa = dealsMock.filter((d) => d.empresa_id === empresa.id);

  const [modal, setModal] = useState<{ name: ModalName }>({ name: undefined });
  const closeModal = () => setModal({ name: undefined });

  const acciones = (
    <EmpresaAcciones
      context={{ id: empresa.id, nombre: empresa.nombre }}
      handlers={{
        openAgregarActividad: () => setModal({ name: "agregar-actividad" }),
        openAgregarDeal: () => setModal({ name: "agregar-deal" }),
        openAgregarEmpresa: () => setModal({ name: "editar-empresa" }),
        openAgregarContacto: () => setModal({ name: "agregar-contacto" }),
        onEliminar: () => (onEliminar ? onEliminar() : alert("Eliminar empresa")),
      }}
      align="right"
    />
  );

  return (
    <Box>
      <EmpresaHeader
        nombre={empresa.nombre}
        onVolver={() => navigate("/empresas")}
        acciones={acciones}
      />
      <Box sx={{ mb: 2, p: 0.5 }}>
        <EmpresaInfoPanel
          industria={industriasMock.find((i) => i.id === empresa.industria_id)?.nombre || "—"}
          zona={zonasMock.find((z) => z.id === empresa.zona_id)?.nombre || "—"}
          rfc={empresa.rfc || "—"}
          estatus={estatusEmpresasMock.find((e) => e.id === empresa.estatus_id)?.nombre || "—"}
          fechaAlta={empresa.fecha_alta || "—"}
          fechaUltimaActividad={empresa.fecha_ultima_actividad || "—"}
        />
      </Box>
      <Grid container spacing={1.5} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6.3 }}>
          <Box sx={{ p: 0.5 }}>
            <EmpresaContactosTable
              contactos={contactosEmpresa}
              onRowClick={(id) => navigate(`/contactos/${id}`)}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 5.7 }}>
          <Box sx={{ p: 0.5 }}>
            <EmpresaActividadesTable
              actividades={actividadesEmpresa}
              onRowClick={(id) => navigate(`/actividades/${id}`)}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ p: 0.5 }}>
            <EmpresaDealsTable
              deals={dealsEmpresa}
              onRowClick={(id) => navigate(`/deals/${id}`)}
            />
          </Box>
        </Grid>
      </Grid>

      {modal.name === "agregar-actividad" && (
        <AgregarActividadModal
          key="agregar-actividad"
          open
          onClose={closeModal}
          onSave={(actividad) => {
            console.log("Actividad guardada:", actividad);
            alert("Actividad agregada");
            closeModal();
          }}
          defaultEmpresaId={empresa.id}
        />
      )}

      {modal.name === "agregar-deal" && (
        <AgregarDealModal
          key="agregar-deal"
          open
          onClose={closeModal}
          defaultEmpresaId={empresa.id}
          onSave={(deal) => {
            console.log("Deal guardado:", deal);
            alert("Deal agregado");
            closeModal();
          }}
        />
      )}

      {modal.name === "editar-empresa" && (
        <AgregarEmpresaModal
          key="editar-empresa"
          open
          onClose={closeModal}
          onSave={(empresaForm) => {
            console.log("Empresa guardada/actualizada:", empresaForm);
            alert("Empresa actualizada");
            closeModal();
          }}
          industrias={industriasMock}
          zonas={zonasMock}
          estatus={estatusEmpresasMock}
          empresaId={empresa.id}
        />
      )}

      {modal.name === "agregar-contacto" && (
        <AgregarContactoModal
          key="agregar-contacto"
          open
          onClose={closeModal}
          onSave={(contacto) => {
            console.log("Contacto guardado:", contacto);
            alert("Contacto agregado");
            closeModal();
          }}
          empresas={empresasMock}
          estatusContactos={estatusContactosMock}
          defaultEmpresaId={empresa.id}
        />
      )}
    </Box>
  );
};

export default EmpresaDetalleView;
