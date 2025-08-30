import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface EmpresaHeaderProps {
  nombre: string;
  onVolver: () => void;
  acciones: React.ReactNode;
}

const EmpresaHeader: React.FC<EmpresaHeaderProps> = ({ nombre, onVolver, acciones }) => (
  <Box mb={3}>
    <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
      <Box flex={1} display="flex" flexDirection="column" minWidth={0}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: "1.9rem",
            wordBreak: "break-word",
            mb: 2,
            textAlign: "right",
            width: "100%",
          }}
        >
          {nombre}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    onClick={onVolver}
                    sx={{ minWidth: 120, fontSize: "0.8rem", fontWeight: "bold", py: 0.7, px: 1.5 }}
                >
                    Volver
                </Button>
            </Box>
            <Box display="flex" gap={2}>
            {acciones}
            </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default EmpresaHeader;