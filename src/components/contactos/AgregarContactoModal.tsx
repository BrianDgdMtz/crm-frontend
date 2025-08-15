import React, { useEffect, useState } from "react";
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
import { contactosMock } from "../../mock/contactosMock";

interface AgregarContactoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (contacto: NuevoContactoForm) => void;
  empresas: Empresa[];
  estatusContactos: estatusContacto[];
  defaultEmpresaId?: number;
  contactoId?: number;
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

const emptyForm: NuevoContactoForm = {
  nombre: "",
  correo: "",
  telefono: "",
  empresa_id: 0,
  posicion: "",
  fecha_creacion: "",
  estatus_id: 0,
  notas: "",
};

const AgregarContactoModal: React.FC<AgregarContactoModalProps> = ({
  open,
  onClose,
  onSave,
  empresas,
  estatusContactos,
  defaultEmpresaId,
  contactoId,
}) => {
  const [form, setForm] = useState<NuevoContactoForm>(emptyForm);

  useEffect(() => {
    if (!open) return;

    if (contactoId) {
      const c = contactosMock.find(x => x.id === contactoId);
      if (c) {
        setForm({
          nombre: c.nombre ?? "",
          correo: c.correo ?? "",
          telefono: c.telefono ?? "",
          empresa_id: c.empresa_id ?? 0,
          posicion: (c as any).posicion ?? "",
          fecha_creacion: (c as any).fecha_creacion ?? "",
          estatus_id: (c as any).estatus_id ?? 0,
          notas: (c as any).notas ?? "",
        });
        return;
      }
    }
    setForm({ ...emptyForm, empresa_id: defaultEmpresaId ?? 0 });
  }, [open, contactoId, defaultEmpresaId]);

  const reset = () => setForm(emptyForm);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name.endsWith("_id") ? Number(value) : value,
    }));
  };

  const handleSave = () => {
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

  const isEdit = Boolean(contactoId);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Editar contacto" : "Agregar nuevo contacto"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="nombre"
              label="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="correo"
              label="Correo electrónico"
              value={form.correo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="telefono"
              label="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name="posicion"
              label="Posición / Cargo"
              value={form.posicion}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6 }}>
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

          <Grid size={{ xs: 12 }}>
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
          {isEdit ? "Guardar cambios" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarContactoModal;
