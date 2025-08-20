import React, { useState, useMemo, useEffect } from "react";
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
import { etapaDealsMock } from "../../mock/etapaDealsMock";
import { estadoDealsMock } from "../../mock/estadoDealsMock";
import { dealsMock } from "../../mock/dealsMock";

interface AgregarDealModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (deal: any) => void;
  defaultEmpresaId?: number;
  defaultContactoId?: number;
  dealId?: number;
}

const emptyForm = {
  titulo: "",
  empresa_id: "",
  contacto_id: "",
  etapa_id: "",
  estado_id: "",
  fecha_creacion: "",
  fecha_cierre_estimada: "",
  monto_estimado: "",
  observaciones: "",
};

const AgregarDealModal: React.FC<AgregarDealModalProps> = ({
  open,
  onClose,
  onSave,
  defaultEmpresaId,
  defaultContactoId,
  dealId,
}) => {
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    if (dealId) {
      const d = dealsMock.find((x) => x.id === dealId);
      if (d) {
        setForm({
          titulo: d.titulo ?? "",
          empresa_id: d.empresa_id ? String(d.empresa_id) : "",
          contacto_id: d.contacto_id ? String(d.contacto_id) : "",
          etapa_id: d.etapa_id ? String(d.etapa_id) : "",
          estado_id: d.estado_id ? String(d.estado_id) : "",
          fecha_creacion: d.fecha_creacion ?? "",
          fecha_cierre_estimada: d.fecha_cierre_esperada ?? "",
          monto_estimado: d.monto_estimado ? String(d.monto_estimado) : "",
          observaciones: d.observaciones ?? "",
        });
        setError(null);
        return;
      }
    }
    setForm((_prev) => {
      const empresa_id = defaultEmpresaId ? String(defaultEmpresaId) : "";
      const contacto_id = defaultContactoId ? String(defaultContactoId) : "";
      return { ...emptyForm, empresa_id, contacto_id };
    });
    setError(null);
  }, [open, dealId, defaultEmpresaId, defaultContactoId]);

  const contactosFiltrados = useMemo(() => {
    if (!form.empresa_id) return [];
    return contactosMock.filter((c) => c.empresa_id === Number(form.empresa_id));
  }, [form.empresa_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "empresa_id") next.contacto_id = "";
      setError(null);
      return next;
    });
  };

  const handleGuardar = () => {
    if (
      !form.titulo ||
      !form.empresa_id ||
      !form.contacto_id ||
      !form.etapa_id ||
      !form.estado_id ||
      !form.fecha_creacion ||
      !form.fecha_cierre_estimada ||
      !form.monto_estimado
    ) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    onSave({
      ...form,
      empresa_id: Number(form.empresa_id),
      contacto_id: Number(form.contacto_id),
      etapa_id: Number(form.etapa_id),
      estado_id: Number(form.estado_id),
      monto_estimado: Number(form.monto_estimado),
    });

    setForm({ ...emptyForm });
    setError(null);
    onClose();
  };

  const handleCancelar = () => {
    setForm({ ...emptyForm });
    setError(null);
    onClose();
  };

  const isEdit = Boolean(dealId);

  return (
    <Dialog open={open} onClose={handleCancelar} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">{isEdit ? "Editar deal" : "Crear nuevo deal"}</DialogTitle>
      <DialogContent>
        <Box component="form" mt={1}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="titulo"
                label="Título del deal"
                value={form.titulo}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                name="empresa_id"
                label="Empresa"
                value={form.empresa_id}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {empresasMock.map((empresa) => (
                  <MenuItem key={empresa.id} value={empresa.id}>
                    {empresa.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                name="contacto_id"
                label="Contacto principal"
                value={form.contacto_id}
                onChange={handleChange}
                fullWidth
                required
                disabled={!form.empresa_id}
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
                name="etapa_id"
                label="Etapa"
                value={form.etapa_id}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {etapaDealsMock.map((etapa) => (
                  <MenuItem key={etapa.id} value={etapa.id}>
                    {etapa.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                name="estado_id"
                label="Estado"
                value={form.estado_id}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {estadoDealsMock.map((estado) => (
                  <MenuItem key={estado.id} value={estado.id}>
                    {estado.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="fecha_creacion"
                label="Fecha de creación"
                type="date"
                value={form.fecha_creacion}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="fecha_cierre_estimada"
                label="Fecha de cierre estimada"
                type="date"
                value={form.fecha_cierre_estimada}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="monto_estimado"
                label="Monto estimado"
                type="number"
                value={form.monto_estimado}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                name="observaciones"
                label="Observaciones"
                value={form.observaciones}
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
          {isEdit ? "Guardar cambios" : "Crear Deal"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarDealModal;