import React from "react";
import { Box, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ActividadHeaderProps {
  titulo: string;
  realizada: boolean;
  onToggleRealizada: (valor: boolean) => void;
  onVolver: () => void;
  acciones: React.ReactNode;
}

const ActividadHeader: React.FC<ActividadHeaderProps> = ({
  titulo,
  realizada,
  onToggleRealizada,
  onVolver,
  acciones,
}) => (
  <Box mb={3}>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexWrap="wrap"
      mb={2}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ wordBreak: "break-word", minWidth: 200 }}
      >
        {titulo}
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={realizada}
            onChange={(_, checked) => onToggleRealizada(checked)}
            color="primary"
          />
        }
        label="Marcar como realizada"
        sx={{ ml: "auto" }}
      />
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
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
      <Box display="flex" gap={2}>
        {acciones}
      </Box>
    </Box>
  </Box>
);

export default ActividadHeader;