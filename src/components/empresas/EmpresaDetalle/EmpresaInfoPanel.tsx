import React from 'react';
import { Card, Typography, Box } from '@mui/material';

interface EmpresaInfoPanelProps {
    industria: string;
    rfc: string;
    estatus: string;
    fechaAlta: string;
}

const EmpresaInfoPanel: React.FC<EmpresaInfoPanelProps> = ({
    industria,
    rfc,
    estatus,
    fechaAlta,
}) => (
    <Card sx={{ mb: 2, p: 2 }}>
    <Box display="flex" flexWrap="wrap" gap={4}>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">Industria:</Typography>
        <Typography>{industria}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">RFC:</Typography>
        <Typography>{rfc}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">Estatus:</Typography>
        <Typography>{estatus}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">Fecha de alta:</Typography>
        <Typography>{fechaAlta}</Typography>
      </Box>
    </Box>
  </Card>
);

export default EmpresaInfoPanel;