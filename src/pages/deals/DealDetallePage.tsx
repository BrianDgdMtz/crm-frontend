import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DealDetalleView from "../../components/deals/DealDetalle/DealDetalleView";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { dealsMock } from "../../mock/dealsMock";
import { empresasMock } from "../../mock/empresasMock";
import { contactosMock } from "../../mock/contactosMock";

const DealDetallePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const deal = dealsMock.find((d) => d.id === Number(id));

    if (!deal) {
        return (
        <div>
            <h2>No se encontró el deal solicitado.</h2>
            <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/deals")}
            sx={{ mb: 5 }}
            >
            Volver
            </Button>
        </div>
        );
    }

    const empresa = empresasMock.find((e) => e.id === deal.empresa_id) ?? null;
    const contacto = contactosMock.find((c) => c.id === deal.contacto_id) ?? null;

    return(
        <DealDetalleView
            deal={deal}
            empresa={empresa}
            contacto={contacto}
        />
    );
};

export default DealDetallePage;