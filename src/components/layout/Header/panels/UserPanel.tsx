import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

type UserPanelProps = {
  open: boolean;
  onClose: () => void;
  user: { name: string; email?: string; role?: string; avatarUrl?: string };
  onGoHome: () => void;
  onProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
};

const UserPanel: React.FC<UserPanelProps> = ({
  open,
  onClose,
  user,
  onGoHome,
  onProfile,
  onSettings,
  onLogout,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
            sx: {
            backgroundColor: "rgba(15, 23, 42, 0.25)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            },
        },
      }}
      PaperProps={{
        sx: {
        width: { xs: "100%", sm: 360 },
        borderRadius: { xs: 0, sm: "16px 0 0 16px" },
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(20px) saturate(125%)",
        WebkitBackdropFilter: "blur(20px) saturate(125%)",
        border: (t) => `1px solid ${t.palette.divider}`,
        boxShadow: 3,
        },
    }}
    >
      <Box sx={{ position: "relative", p: 2 }}>
        <IconButton onClick={onClose} aria-label="Cerrar panel">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          px: 3,
          pb: 3,
          pt: 0,
          background:
            "radial-gradient(120px 80px at 85% -20%, #8FFDF533, transparent 40%), radial-gradient(140px 100px at -15% 0%, #8FFDF51A, transparent 45%)",
        }}
      >
        <Stack alignItems="center" spacing={1.5}>
          <Box
            sx={{
              // Variables Ajustables
              "--size": "120px",        // tamaño del avatar (ancho/alto)
              "--thickness": "5px",     // grosor del anillo
              "--arc": "-360deg",        // longitud del arco
              "--fade": "120deg",        // fade en extremos
              "--offset": "11px",        // separación del anillo respecto al borde del avatar
              "--speed": "8s",
              "--ringColor": "#10b981",
              position: "relative",
              width: "var(--size)",
              height: "var(--size)",
              "@keyframes spin": { to: { transform: "rotate(360deg)" } },
              // anillo animado alineado
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "calc(-1 * var(--offset))",
                borderRadius: "50%",
                transformOrigin: "center center",
                animation: "spin var(--speed) linear infinite",
                pointerEvents: "none",
                zIndex: 0,
                // arco con extremos suaves
                background: `
                  conic-gradient(
                    from 0deg,
                    transparent 0deg,
                    transparent calc((360deg - var(--arc)) / 2 - var(--fade)),
                    color-mix(in srgb, var(--ringColor) 0%, transparent) calc((360deg - var(--arc)) / 2 - var(--fade)),
                    var(--ringColor) calc((360deg - var(--arc)) / 2),
                    var(--ringColor) calc((360deg + var(--arc)) / 2),
                    color-mix(in srgb, var(--ringColor) 0%, transparent) calc((360deg + var(--arc)) / 2 + var(--fade)),
                    transparent calc((360deg + var(--arc)) / 2 + var(--fade)),
                    transparent 360deg
                  )
                `,
                // grosor del aro
                mask: "radial-gradient(farthest-side, transparent calc(100% - var(--thickness)), #000 0)",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - var(--thickness)), #000 0)",
                // glow sutil
                filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--ringColor) 35%, transparent))",
              },
            }}
          >
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              sx={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "0px solid rgba(255,255,255,0.35)",
                boxShadow: "0 2px 12px rgba(0,0,0,.15)",
              }}
            >
              {user.name?.[0] ?? "U"}
            </Avatar>
          </Box>
          <Typography variant="h6" fontWeight={800} textAlign="center">
            {user.name}
          </Typography>
          {user.email && (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {user.email}
            </Typography>
          )}
        </Stack>
      </Box>

      <Divider />

      <List sx={{ py: 0 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { onClose(); onGoHome(); }}>
            <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => { onClose(); onProfile(); }}>
            <ListItemIcon><PersonRoundedIcon /></ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => { onClose(); onSettings(); }}>
            <ListItemIcon><SettingsRoundedIcon /></ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => { onClose(); onLogout(); }}
          startIcon={<LogoutRoundedIcon />}
          sx={{
            bgcolor: "grey.900",
            color: "#fff",
            boxShadow: "none",
            fontWeight: 700,
            borderRadius: 2,
            minHeight: 48,
            "&:hover": { bgcolor: "grey.800" },
          }}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Drawer>
  );
};

export default UserPanel;