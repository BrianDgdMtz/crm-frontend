import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { empresasMock } from "../../mock/empresasMock";
import EmpresaDetalleView from "../../components/empresas/EmpresaDetalle/EmpresaDetalleView";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const EmpresaDetallePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Busca la empresa según el id recibido en la URL
  const empresa = empresasMock.find((e) => e.id === Number(id));

  if (!empresa) {
    return (
      <div>
        <h2>No se encontró la empresa solicitada.</h2>
        <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/empresas")}
            sx={{ mb: 5 }}
            >
            Volver
        </Button>
      </div>
    );
  }

  return (
    <EmpresaDetalleView empresa={empresa} />
  );
};

export default EmpresaDetallePage;
