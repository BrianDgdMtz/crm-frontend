import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Industria } from "../../mock/industriasMock";
import type { Zona } from "../../mock/zonasMock";
import type { estatusEmpresa } from "../../mock/estatusEmpresasMock";

// Props para reutilizar el modal
interface AgregarEmpresaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (empresa: NuevaEmpresaForm) => void;
  industrias: Industria[];
  zonas: Zona[];
  estatus: estatusEmpresa[];
}

// Solo los campos del formulario
export interface NuevaEmpresaForm {
  nombre: string;
  industria_id: number;
  rfc: string;
  estatus_id: number;
  zona_id: number;
  fecha_alta: string;
}

export const AgregarEmpresaModal: React.FC<AgregarEmpresaModalProps> = ({
  open,
  onClose,
  onSave,
  industrias,
  zonas,
  estatus,
}) => {
  const [form, setForm] = useState<NuevaEmpresaForm>({
    nombre: "",
    industria_id: 0,
    rfc: "",
    estatus_id: 0,
    zona_id: 0,
    fecha_alta: "",
  });

  // Limpiar al cerrar
  const handleClose = () => {
    setForm({
      nombre: "",
      industria_id: 0,
      rfc: "",
      estatus_id: 0,
      zona_id: 0,
      fecha_alta: "",
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name.endsWith("_id") ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    // Validación simple
    if (!form.nombre || !form.industria_id || !form.rfc || !form.estatus_id || !form.zona_id || !form.fecha_alta) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    onSave(form);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar empresa</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="nombre"
              label="Nombre"
              value={form.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="industria_id"
              label="Industria"
              select
              value={form.industria_id}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value={0}>Seleccionar</MenuItem>
              {industrias.map((i) => (
                <MenuItem key={i.id} value={i.id}>
                  {i.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="rfc"
              label="RFC"
              value={form.rfc}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="estatus_id"
              label="Estatus"
              select
              value={form.estatus_id}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value={0}>Seleccionar</MenuItem>
              {estatus.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              name="zona_id"
              label="Zona"
              select
              value={form.zona_id}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value={0}>Seleccionar</MenuItem>
              {zonas.map((z) => (
                <MenuItem key={z.id} value={z.id}>
                  {z.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="fecha_alta"
              label="Fecha de alta"
              type="date"
              value={form.fecha_alta}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarEmpresaModal;
