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
import type { Empresa } from "../../mock/empresasMock";
import type { estatusContacto } from "../../mock/estatusContactosMock";

interface AgregarContactoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (contacto: NuevoContactoForm) => void;
  empresas: Empresa[];
  estatusContactos: estatusContacto[];
}

export interface NuevoContactoForm {
  nombre: string;
  correo: string;
  telefono: string;
  empresa_id: number;
  posicion: string;
  fecha_creacion: string;
  estatus_id: number;
  notas: string;
}

const AgregarContactoModal: React.FC<AgregarContactoModalProps> = ({
  open,
  onClose,
  onSave,
  empresas,
  estatusContactos,
}) => {
  const [form, setForm] = useState<NuevoContactoForm>({
    nombre: "",
    correo: "",
    telefono: "",
    empresa_id: 0,
    posicion: "",
    fecha_creacion: "",
    estatus_id: 0,
    notas: "",
  });

  // Limpiar al cerrar
  const handleClose = () => {
    setForm({
      nombre: "",
      correo: "",
      telefono: "",
      empresa_id: 0,
      posicion: "",
      fecha_creacion: "",
      estatus_id: 0,
      notas: "",
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
    if (
      !form.nombre ||
      !form.correo ||
      !form.telefono ||
      !form.empresa_id ||
      !form.posicion ||
      !form.fecha_creacion ||
      !form.estatus_id
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    onSave(form);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar nuevo contacto</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size = {{xs : 12}}>
            <TextField
              name="nombre"
              label="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size = {{xs : 12, sm : 6}}>
            <TextField
              name="correo"
              label="Correo electrónico"
              value={form.correo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size = {{xs : 12, sm : 6}}>
            <TextField
              name="telefono"
              label="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size = {{xs : 12, sm : 6}}>
            <TextField
              name="empresa_id"
              label="Empresa asociada"
              select
              value={form.empresa_id}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value={0}>Seleccionar</MenuItem>
              {empresas.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size = {{xs : 12, sm : 6}}>
            <TextField
              name="posicion"
              label="Posición / Cargo"
              value={form.posicion}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid size = {{xs : 12, sm : 6}}>
            <TextField
              name="fecha_creacion"
              label="Fecha de creación"
              type="date"
              value={form.fecha_creacion}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid size = {{xs : 12, sm : 6}}>
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
              {estatusContactos.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size = {{xs : 12 }}>
            <TextField
              name="notas"
              label="Notas adicionales"
              value={form.notas}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
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

export default AgregarContactoModal;
