import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contactosMock } from "../../mock/contactosMock";
import { empresasMock } from "../../mock/empresasMock";
import { industriasMock } from "../../mock/industriasMock";
import { zonasMock } from "../../mock/zonasMock";
import { estatusContactosMock } from "../../mock/estatusContactosMock";
import { dealsMock } from "../../mock/dealsMock";
import { actividadesMock } from "../../mock/actividadesMock";
import { estadoDealsMock } from "../../mock/estadoDealsMock";
import { etapaDealsMock } from "../../mock/etapaDealsMock";
import { tipoActividadMock } from "../../mock/tipoActividadMock";
import { usuariosMock } from "../../mock/usuariosMock";
import ContactoDetalleView from "../../components/contactos/ContactoDetalle/ContactoDetalleView";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ContactoDetallePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Busca el contacto según el id recibido en la URL
  const contacto = contactosMock.find((c) => c.id === Number(id));

  // Si no existe, muestra mensaje de error simple
  if (!contacto) {
    return (
      <div>
        <h2>No se encontró el contacto solicitado.</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/contactos")}
          sx={{ mb: 5 }}
        >
          Volver
        </Button>
      </div>
    );
  }

  // Buscar empresa relacionada
  const empresa = empresasMock.find((e) => e.id === contacto.empresa_id);
  // Industria, zona, estatus (para etiquetas)
  const industria = empresa ? industriasMock.find((i) => i.id === empresa.industria_id) : null;
  const zona = empresa ? zonasMock.find((z) => z.id === empresa.zona_id) : null;
  const estatus = estatusContactosMock.find((e) => e.id === contacto.estatus_id);

  // Deals relacionados (por contacto_id)
  const deals = dealsMock.filter((d) => d.contacto_id === contacto.id);
  // Actividades relacionadas (por contacto_id)
  const actividades = actividadesMock.filter((a) => a.contacto_id === contacto.id);

  return (
    <ContactoDetalleView
      contacto={contacto}
      empresa={empresa}
      industria={industria}
      zona={zona}
      estatus={estatus}
      deals={deals}
      actividades={actividades}
      estadoDeals={estadoDealsMock}
      etapaDeals={etapaDealsMock}
      tiposActividad={tipoActividadMock}
      usuarios={usuariosMock}
    />
  );
};

export default ContactoDetallePage;
