import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { empresasMock } from "../mock/empresasMock";
import { industriasMock } from "../mock/industriasMock";
import { zonasMock } from "../mock/zonasMock";
import { estatusEmpresasMock } from "../mock/estatusEmpresasMock";
import { EmpresasTable } from "../components/empresas/EmpresasTable";
import { EmpresaFilters } from "../components/empresas/EmpresaFilters";
import { EmpresaToolbar } from "../components/empresas/EmpresaToolbar";
import { AgregarEmpresaModal } from "../components/empresas/AgregarEmpresaModal";
import type { NuevaEmpresaForm } from "../components/empresas/AgregarEmpresaModal";

// Convierte empresasMock a array con nombres
const empresasConNombres = (empresas: typeof empresasMock) =>
  empresas.map((empresa) => ({
    id: empresa.id,
    nombre: empresa.nombre,
    industria: industriasMock.find((i) => i.id === empresa.industria_id)?.nombre || "",
    zona: zonasMock.find((z) => z.id === empresa.zona_id)?.nombre || "",
    fecha_ultima_actividad: empresa.fecha_ultima_actividad,
  }));

const EmpresasPage: React.FC = () => {
  const [empresas, setEmpresas] = useState(empresasMock);
  const [zona, setZona] = useState<number | "">("");
  const [industria, setIndustria] = useState<number | "">("");
  const [busqueda, setBusqueda] = useState<string>("");
  const [openAgregar, setOpenAgregar] = useState(false);

  const navigate = useNavigate();

  // Filtro + búsqueda
  const empresasFiltradas = empresasConNombres(empresas).filter((empresa) => {
    const zonaMatch =
      !zona || empresa.zona === zonasMock.find((z) => z.id === zona)?.nombre;
    const industriaMatch =
      !industria || empresa.industria === industriasMock.find((i) => i.id === industria)?.nombre;
    const busquedaMatch =
      busqueda === "" ||
      empresa.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return zonaMatch && industriaMatch && busquedaMatch;
  });

  // Al guardar, agrega la nueva empresa al mock local (con id incremental)
  const handleAgregarEmpresa = (nueva: NuevaEmpresaForm) => {
    const nuevaEmpresa = {
      id: empresas.length + 1,
      nombre: nueva.nombre,
      industria_id: nueva.industria_id,
      zona_id: nueva.zona_id,
      estatus_id: nueva.estatus_id,
      fecha_alta: nueva.fecha_alta,
      rfc: nueva.rfc,
      fecha_ultima_actividad: "",
    };
    setEmpresas([...empresas, nuevaEmpresa]);
  };

  return (
    <div style={{ margin: "2rem" }}>
      <EmpresaToolbar
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        onAgregarEmpresa={() => setOpenAgregar(true)}
      />
      <EmpresaFilters
        zonas={zonasMock}
        industrias={industriasMock}
        zonaSeleccionada={zona}
        industriaSeleccionada={industria}
        onZonaChange={setZona}
        onIndustriaChange={setIndustria}
        onLimpiar={() => {
          setZona("");
          setIndustria("");
        }}
      />
      <EmpresasTable
        empresas={empresasFiltradas}
        onRowClick={(empresaId) => navigate(`/empresas/${empresaId}`)}
      />

      <AgregarEmpresaModal
        open={openAgregar}
        onClose={() => setOpenAgregar(false)}
        onSave={handleAgregarEmpresa}
        industrias={industriasMock}
        zonas={zonasMock}
        estatus={estatusEmpresasMock}
      />
    </div>
  );
};

export default EmpresasPage;
