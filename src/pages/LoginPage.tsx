import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import crmImagen from "../assets/img/crm-login.png"

type LoginPageProps = {
  illustrationSrc?: string;
};

const LoginPage: React.FC<LoginPageProps> = ({
  illustrationSrc = crmImagen,
}) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [email, setEmail] = useState("demo@crm.com");
  const [password, setPassword] = useState("Demo2025!");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      const redirectTo = location?.state?.from?.pathname ?? "/";
      navigate(`/boot?to=${encodeURIComponent(redirectTo)}`, { replace: true });
    } catch (err: any) {
      setErrorMsg(err?.message ?? "No se pudo iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100dvh" }}>
      <Grid size= {{ xs: 12, md: 4.5 }}
        sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#F7F7F7",
            p: 6,
        }}
      >
        <Box maxWidth={520}>
          <Typography variant="h3" fontWeight={800} textAlign="center" gutterBottom>
            Hola, bienvenido
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign="center" mb={4}>
            Más efectividad con flujos de trabajo optimizados.
          </Typography>
          <Box
            component="img"
            src={illustrationSrc}
            alt="Login illustration"
            sx={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Grid>

      <Grid size= {{ xs: 12, md: 7.5 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, md: 8 },
        }}
      >
        <Card variant="outlined" sx={{ width: 520, maxWidth: "100%", border: "none" }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack spacing={2} mb={2}>
              <Typography variant="h5" fontWeight={700}>
                Inicia sesión con tu cuenta
              </Typography>

              <Typography variant="body2" color="text.secondary">
                ¿No tienes cuenta?{" "}
                <Link component={RouterLink} to="#" underline="hover">
                  ¡Empieza ya!
                </Link>
              </Typography>
            </Stack>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 2,
                borderRadius: 2,
                mb: 3,
                bgcolor: (t) => t.palette.success.light + "22",
              }}
            >
              <InfoOutlinedIcon fontSize="medium" sx={{ mt: "1px", color: "success.main" }} />
              <Typography variant="body2" sx={{ color: "success.darker" }}>
                Utilice <b>demo@crm.com</b> con la contraseña <b>Demo2025!</b>
              </Typography>
            </Box>

            {errorMsg && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                    Correo electrónico
                  </Typography>
                  <TextField
                    fullWidth
                    size="medium"
                    type="email"
                    placeholder="demo@crm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Stack>

                <Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Contraseña
                    </Typography>
                    <Link component={RouterLink} to="#" underline="hover" variant="subtitle1">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </Stack>

                  <TextField
                    fullWidth
                    size="medium"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((s) => !s)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  sx={{
                    mt: 1,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 700,
                    bgcolor: "grey.900",
                    "&:hover": { bgcolor: "grey.800" },
                  }}
                >
                  {submitting ? "Iniciando sesión..." : "iniciar sesión"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginPage;