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
import type { Industria } from "../../mock/industriasMock";
import type { Zona } from "../../mock/zonasMock";
import type { estatusEmpresa } from "../../mock/estatusEmpresasMock";
import { empresasMock } from "../../mock/empresasMock";

interface AgregarEmpresaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (empresa: NuevaEmpresaForm) => void;
  industrias: Industria[];
  zonas: Zona[];
  estatus: estatusEmpresa[];
  empresaId?: number;
}

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
  empresaId,
}) => {
  const [form, setForm] = useState<NuevaEmpresaForm>({
    nombre: "",
    industria_id: 0,
    rfc: "",
    estatus_id: 0,
    zona_id: 0,
    fecha_alta: "",
  });

  useEffect(() => {
    if (!open) return;

    if (empresaId) {
      const empresa = empresasMock.find(e => e.id === empresaId);
      if (empresa) {
        setForm({
          nombre: empresa.nombre ?? "",
          industria_id: empresa.industria_id ?? 0,
          rfc: empresa.rfc ?? "",
          estatus_id: empresa.estatus_id ?? 0,
          zona_id: empresa.zona_id ?? 0,
          fecha_alta: empresa.fecha_alta ?? "",
        });
      }
    } else {
      setForm({
        nombre: "",
        industria_id: 0,
        rfc: "",
        estatus_id: 0,
        zona_id: 0,
        fecha_alta: "",
      });
    }
  }, [open, empresaId]);

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
    if (!form.nombre || !form.industria_id || !form.rfc || !form.estatus_id || !form.zona_id || !form.fecha_alta) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    onSave(form);
    handleClose();
  };

  const isEdit = Boolean(empresaId);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Editar empresa" : "Agregar empresa"}</DialogTitle>
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
          {isEdit ? "Guardar cambios" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarEmpresaModal;
