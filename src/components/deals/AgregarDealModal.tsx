import React, { useState, useMemo } from "react";
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

interface AgregarDealModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (deal: any) => void; // Puedes tipar mejor según tu modelo
}

const AgregarDealModal: React.FC<AgregarDealModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  // Estado del formulario
  const [form, setForm] = useState({
    titulo: "",
    empresa_id: "",
    contacto_id: "",
    etapa_id: "",
    estado_id: "",
    fecha_creacion: "",
    fecha_cierre_estimada: "",
    monto_estimado: "",
    observaciones: "",
  });

  // Validación simple
  const [error, setError] = useState<string | null>(null);

  // Filtrar contactos por empresa seleccionada
  const contactosFiltrados = useMemo(() => {
    if (!form.empresa_id) return [];
    return contactosMock.filter(
      (c) => c.empresa_id === Number(form.empresa_id)
    );
  }, [form.empresa_id]);

  // Manejo de cambios
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(null);
    // Si cambió la empresa, limpia contacto seleccionado
    if (e.target.name === "empresa_id") {
      setForm((prev) => ({ ...prev, contacto_id: "" }));
    }
  };

  // Manejo de envío
  const handleCrear = () => {
    // Validación mínima
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
    setForm({
      titulo: "",
      empresa_id: "",
      contacto_id: "",
      etapa_id: "",
      estado_id: "",
      fecha_creacion: "",
      fecha_cierre_estimada: "",
      monto_estimado: "",
      observaciones: "",
    });
    setError(null);
    onClose();
  };

  // Limpiar y cerrar modal
  const handleCancelar = () => {
    setForm({
      titulo: "",
      empresa_id: "",
      contacto_id: "",
      etapa_id: "",
      estado_id: "",
      fecha_creacion: "",
      fecha_cierre_estimada: "",
      monto_estimado: "",
      observaciones: "",
    });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancelar} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Crear nuevo deal</DialogTitle>
      <DialogContent>
        <Box component="form" mt={1}>
          <Grid container spacing={2}>
            {/* Primera fila */}
            <Grid size = {{xs: 12, sm: 6}}>
              <TextField
                name="titulo"
                label="Título del deal"
                value={form.titulo}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size = {{xs: 12, sm: 6}}>
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
            {/* Segunda fila */}
            <Grid size = {{xs: 12, sm: 6}}>
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
                {contactosFiltrados.map((contacto) => (
                  <MenuItem key={contacto.id} value={contacto.id}>
                    {contacto.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size = {{xs: 12, sm: 6}}>
              <TextField
                select
                name="etapa_id"
                label="Etapa inicial"
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
            <Grid size = {{xs: 12, sm: 6}}>
              <TextField
                select
                name="estado_id"
                label="Estado inicial"
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
            {/* Tercera fila */}
            <Grid size = {{xs: 12, sm: 6}}>
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
            <Grid size = {{xs: 12, sm: 6}}>
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
            {/* Cuarta fila */}
            <Grid size = {{xs: 12, sm: 6}}>
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
            <Grid size = {{xs: 12 }}>
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
        <Button onClick={handleCrear} color="primary" variant="contained">
          Crear Deal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarDealModal;
