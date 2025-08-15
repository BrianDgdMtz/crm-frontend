import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { empresasMock } from "../../mock/empresasMock";
import { contactosMock } from "../../mock/contactosMock";
import { dealsMock } from "../../mock/dealsMock";
import { tipoActividadMock } from "../../mock/tipoActividadMock";
import { actividadesMock } from "../../mock/actividadesMock";

export interface NuevaActividad {
  asunto: string;
  deal_id?: number | null;
  empresa_id?: number | null;
  contacto_id?: number | null;
  tipo_id: number;
  fecha_programada: string;
  notas?: string;
}

interface AgregarActividadModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (actividad: NuevaActividad) => void;
  defaultEmpresaId?: number;
  defaultContactoId?: number;
  defaultDealId?: number;
  actividadId?: number;
}

const emptyForm = {
  asunto: "",
  deal_id: "",
  empresa_id: "",
  contacto_id: "",
  tipo_id: "",
  fecha_programada: "",
  notas: "",
};

const AgregarActividadModal: React.FC<AgregarActividadModalProps> = ({
  open,
  onClose,
  onSave,
  defaultEmpresaId,
  defaultContactoId,
  defaultDealId,
  actividadId,
}) => {
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!open) return;

    if (actividadId) {
      const a = actividadesMock.find(x => x.id === actividadId);
      if (a) {
        setForm({
          asunto: a.asunto ?? "",
          deal_id: a.deal_id ? String(a.deal_id) : "",
          empresa_id: a.empresa_id ? String(a.empresa_id) : "",
          contacto_id: a.contacto_id ? String(a.contacto_id) : "",
          tipo_id: a.tipo_id ? String(a.tipo_id) : "",
          fecha_programada: a.fecha_programada ?? "",
          notas: a.notas ?? "",
        });
        setError(null);
        return;
      }
    }
    setForm(_prev => {
      const empresa_id = defaultEmpresaId ? String(defaultEmpresaId) : "";
      const contacto_id = defaultContactoId ? String(defaultContactoId) : "";
      const deal_id = defaultDealId ? String(defaultDealId) : "";
      return { ...emptyForm, empresa_id, contacto_id, deal_id };
    });
    setError(null);
  }, [open, actividadId, defaultEmpresaId, defaultContactoId, defaultDealId]);

  const contactosFiltrados = useMemo(() => {
    if (!form.empresa_id) return [];
    return contactosMock.filter(c => c.empresa_id === Number(form.empresa_id));
  }, [form.empresa_id]);

  const dealsFiltrados = useMemo(() => {
    if (!form.empresa_id) return dealsMock;
    return dealsMock.filter(d => d.empresa_id === Number(form.empresa_id));
  }, [form.empresa_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "empresa_id") {
      setForm(prev => ({
        ...prev,
        empresa_id: value,
        contacto_id: "",
        deal_id: "",
      }));
      setError(null);
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleGuardar = () => {
    if (!form.asunto.trim() || !form.tipo_id || !form.fecha_programada) {
      setError("Asunto, tipo de actividad y fecha son obligatorios.");
      return;
    }

    const payload: NuevaActividad = {
      asunto: form.asunto.trim(),
      tipo_id: Number(form.tipo_id),
      fecha_programada: form.fecha_programada,
      notas: form.notas.trim() || undefined,
      empresa_id: form.empresa_id ? Number(form.empresa_id) : null,
      contacto_id: form.contacto_id ? Number(form.contacto_id) : null,
      deal_id: form.deal_id ? Number(form.deal_id) : null,
    };

    onSave(payload);

    setForm({ ...emptyForm });
    setError(null);
    onClose();
  };

  const handleCancelar = () => {
    setForm({ ...emptyForm });
    setError(null);
    onClose();
  };

  const isEdit = Boolean(actividadId);

  return (
    <Dialog open={open} onClose={handleCancelar} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">{isEdit ? "Editar actividad" : "Agregar actividad"}</DialogTitle>
      <DialogContent>
        <Box component="form" mt={1}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="asunto"
                label="Asunto / Título"
                value={form.asunto}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                name="deal_id"
                label="Vincular a deal"
                value={form.deal_id}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {dealsFiltrados.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.titulo}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                name="empresa_id"
                label="Vincular a empresa"
                value={form.empresa_id}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {empresasMock.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                name="contacto_id"
                label="Vincular a contacto"
                value={form.contacto_id}
                onChange={handleChange}
                fullWidth
                disabled={!form.empresa_id}
                helperText={!form.empresa_id ? "Selecciona primero una empresa" : ""}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {contactosFiltrados.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                name="tipo_id"
                label="Tipo de actividad"
                value={form.tipo_id}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {tipoActividadMock.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="fecha_programada"
                label="Fecha"
                type="date"
                value={form.fecha_programada}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                name="notas"
                label="Notas adicionales"
                value={form.notas}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
          </Grid>

          {error && (
            <Box color="error.main" mt={2} textAlign="center">
              {error}
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancelar} color="inherit" variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleGuardar} color="primary" variant="contained">
          {isEdit ? "Guardar cambios" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarActividadModal;