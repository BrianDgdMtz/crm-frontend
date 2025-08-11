import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ContactoHeaderProps {
  nombre: string;
  onVolver: () => void;
  acciones: React.ReactNode;
}

const ContactoHeader: React.FC<ContactoHeaderProps> = ({ nombre, onVolver, acciones }) => (
  <Box mb={3}>
    <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
      <Box flex={1} display="flex" flexDirection="column" minWidth={0}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            wordBreak: "break-word",
            mb: 2,
            textAlign: "left",
            width: "100%",
          }}
        >
          {nombre}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
          {/* Botón Volver alineado a la izquierda */}
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={onVolver}
              sx={{ minWidth: 130, fontWeight: "bold" }}
            >
              Volver
            </Button>
          </Box>
          {/* Acciones alineadas a la derecha */}
          <Box display="flex" gap={2}>
            {acciones}
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default ContactoHeader;
