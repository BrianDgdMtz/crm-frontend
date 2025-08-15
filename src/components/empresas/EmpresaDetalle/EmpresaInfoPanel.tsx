import React from 'react';
import { Typography, Box } from '@mui/material';
import SectionCard from '../../ui/SectionCard';

interface EmpresaInfoPanelProps {
    industria: string;
    zona: string;
    rfc: string;
    estatus: string;
    fechaAlta: string;
    fechaUltimaActividad: string;
}

const EmpresaInfoPanel: React.FC<EmpresaInfoPanelProps> = ({
    industria,
    zona,
    rfc,
    estatus,
    fechaAlta,
    fechaUltimaActividad,
}) => (
  <SectionCard title="Información de la empresa" hover intro>
    <Box display="flex" flexWrap="wrap" gap={4}>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">Industria:</Typography>
        <Typography>{industria}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">Zona:</Typography>
        <Typography>{zona}</Typography>
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
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">Fecha Ultima Actividad:</Typography>
        <Typography>{fechaUltimaActividad}</Typography>
      </Box>
    </Box>
  </SectionCard>
);

export default EmpresaInfoPanel;