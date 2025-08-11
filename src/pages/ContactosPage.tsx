import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contactosMock } from "../mock/contactosMock";
import { zonasMock } from "../mock/zonasMock";
import { estatusContactosMock } from "../mock/estatusContactosMock";
import { empresasMock } from "../mock/empresasMock";
import ContactosToolbar from "../components/contactos/ContactosToolbar"
import ContactosFilters from "../components/contactos/ContactosFilters";
import ContactosTable from "../components/contactos/ContactosTable";
import AgregarContactoModal, { type NuevoContactoForm } from "../components/contactos/AgregarContactoModal";

// Tipo: contacto con nombre empresa
export interface ContactoConEmpresa {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  posicion: string;
  empresa: string;
}

const ContactosPage: React.FC = () => {
  // Estado para búsqueda, filtros
  const [busqueda, setBusqueda] = useState("");
  const [zona, setZona] = useState<number | "">("");
  const [estatus, setEstatus] = useState<number | "">("");
  const [contactos, setContactos] = useState(contactosMock);
  const [openAgregar, setOpenAgregar] = useState(false);

  const navigate = useNavigate();

  const contactosConEmpresa = contactos.map((c) => ({
  ...c,
  empresa: empresasMock.find((e) => e.id === c.empresa_id)?.nombre || "—",
}));

  // Contactos filtrados según zona/estatus/búsqueda
  const contactosFiltrados = contactosConEmpresa.filter((c) => {
    const zonaEmpresa = empresasMock.find(
      (e) => e.id === contactosMock.find((cm) => cm.id === c.id)?.empresa_id
    )?.zona_id;
    const zonaMatch = !zona || zonaEmpresa === zona;
    const estatusMatch =
      !estatus || contactosMock.find((cm) => cm.id === c.id)?.estatus_id === estatus;
    const busquedaMatch =
      busqueda === "" ||
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.telefono.includes(busqueda);
    return zonaMatch && estatusMatch && busquedaMatch;
  });

  const handleAgregarContacto = (nuevo: NuevoContactoForm) => {
    const contactoNuevo = {
      id: contactos.length + 1,
      nombre: nuevo.nombre,
      correo: nuevo.correo,
      telefono: nuevo.telefono,
      empresa_id: nuevo.empresa_id,
      posicion: nuevo.posicion,
      fecha_creacion: nuevo.fecha_creacion,
      estatus_id: nuevo.estatus_id,
      notas: nuevo.notas
    };
    setContactos([...contactos, contactoNuevo]);
  };

  return (
    <div style={{ margin: "2rem" }}>
      <ContactosToolbar
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        onAgregarContacto={() => setOpenAgregar(true)}
      />
      <ContactosFilters
        zonas={zonasMock}
        estatus={estatusContactosMock}
        zonaSeleccionada={zona}
        estatusSeleccionado={estatus}
        onZonaChange={setZona}
        onEstatusChange={setEstatus}
        onLimpiar={() => {
          setZona("");
          setEstatus("");
        }}
      />
      <ContactosTable 
        contactos={contactosFiltrados}
        onRowClick={(id) => navigate(`/contactos/${id}`)}
      />

      <AgregarContactoModal
        open={openAgregar}
        onClose={() => setOpenAgregar(false)}
        onSave={handleAgregarContacto}
        empresas={empresasMock}
        estatusContactos={estatusContactosMock}
      />
    </div>
  );
};

export default ContactosPage;
