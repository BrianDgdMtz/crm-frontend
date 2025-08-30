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
        <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Industria:</Typography>
        <Typography sx={{fontSize: "0.9rem"}}>{industria}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Zona:</Typography>
        <Typography sx={{fontSize: "0.9rem"}}>{zona}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>RFC:</Typography>
        <Typography sx={{fontSize: "0.9rem"}}>{rfc}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Estatus:</Typography>
        <Typography sx={{fontSize: "0.9rem"}}>{estatus}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Fecha de alta:</Typography>
        <Typography sx={{fontSize: "0.9rem"}}>{fechaAlta}</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{fontSize: "0.9rem"}}>Fecha Ultima Actividad:</Typography>
        <Typography sx={{fontSize: "0.9rem"}}>{fechaUltimaActividad}</Typography>
      </Box>
    </Box>
  </SectionCard>
);

export default EmpresaInfoPanel;