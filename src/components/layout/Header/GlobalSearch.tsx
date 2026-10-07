import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, InputBase, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';
import { empresasMock } from '../../../mock/empresasMock';
import { contactosMock } from '../../../mock/contactosMock';
import { dealsMock } from '../../../mock/dealsMock';

export const GlobalSearch: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Reset query on open
  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    
    const empresas = empresasMock.filter(e => e.nombre.toLowerCase().includes(q)).slice(0, 3).map(e => ({
      id: e.id, type: 'empresa', title: e.nombre, subtitle: `Industria ID: ${e.industria_id}`, path: `/empresas/${e.id}`, icon: <BusinessIcon />
    }));
    
    const contactos = contactosMock.filter(c => c.nombre.toLowerCase().includes(q) || c.correo.toLowerCase().includes(q)).slice(0, 3).map(c => ({
      id: c.id, type: 'contacto', title: c.nombre, subtitle: c.correo, path: `/contactos/${c.id}`, icon: <PersonIcon />
    }));
    
    const deals = dealsMock.filter(d => d.titulo.toLowerCase().includes(q)).slice(0, 3).map(d => ({
      id: d.id, type: 'deal', title: d.titulo, subtitle: `$${d.monto_estimado.toLocaleString()}`, path: `/deals/${d.id}`, icon: <AttachMoneyIcon />
    }));

    return [...empresas, ...contactos, ...deals];
  }, [query]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth 
      PaperProps={{ 
        sx: { 
          borderRadius: 3, 
          position: 'absolute', 
          top: '10vh', 
          m: 0,
          backgroundImage: 'none',
          bgcolor: 'background.paper',
          boxShadow: 24,
        } 
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <SearchIcon color="action" sx={{ mr: 1.5 }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Buscar empresas, contactos, deals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ fontSize: '1.1rem' }}
        />
        <Typography variant="caption" sx={{ bgcolor: 'action.selected', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>
          ESC
        </Typography>
      </Box>
      <DialogContent sx={{ p: 0, minHeight: 100, maxHeight: 400 }}>
        {query.trim() === '' ? (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="body2">Empieza a escribir para buscar en el CRM.</Typography>
          </Box>
        ) : searchResults.length > 0 ? (
          <List sx={{ pt: 0 }}>
            {searchResults.map((result, idx) => (
              <React.Fragment key={`${result.type}-${result.id}`}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleSelect(result.path)} sx={{ py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {result.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={result.title} 
                      secondary={result.subtitle} 
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItemButton>
                </ListItem>
                {idx < searchResults.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="body2">No se encontraron resultados para "{query}"</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
