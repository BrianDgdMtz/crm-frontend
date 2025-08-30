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
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import type { NotificationItem } from "../../../../types/notifications";

type Props = {
  open: boolean;
  onClose: () => void;
  items: NotificationItem[];
  onMarkAllRead: () => void;
  onItemClick: (item: NotificationItem) => void;
  loading?: boolean;
};

const NotificationsPanel: React.FC<Props> = ({
  open,
  onClose,
  items,
  onMarkAllRead,
  onItemClick,
  loading,
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
            width: { xs: "100%", sm: 380 },
            borderRadius: { xs: 0, sm: "16px 0 0 16px" },
            // Efecto de vidrio esmerilado en el panel
            backgroundColor: "rgba(255, 255, 255, 0.65)",
            backdropFilter: "blur(16px) saturate(125%)",
            WebkitBackdropFilter: "blur(16px) saturate(125%)",
            border: (t) => `1px solid ${t.palette.divider}`,
            boxShadow: 3,
            },
        }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 18 }} fontWeight={800}>
          Notificaciones
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Marcar todo como leido">
            <IconButton
                onClick={onMarkAllRead}
                size="small"
                aria-label="Mark all as read"
                color="success"
                sx={{
                    "&:hover": { bgcolor: (t) => t.palette.success.light + "1F" },
                }}
            >
              <DoneAllRoundedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClose} size="small" aria-label="Close panel">
            <CloseRoundedIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Box>

      <Divider />
      {loading ? (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Cargando…
          </Typography>
        </Box>
      ) : items.length === 0 ? (
        <Box sx={{ p: 4 }}>
          <Typography variant="body2" color="text.secondary">
            ¡Estás al día!
          </Typography>
        </Box>
      ) : (
        <List sx={{ py: 1.5 }}>
          {items.map((it) => (
            <Box key={it.id} sx={{ px: 2.5, mb: 1.25 }}>
              <ListItem disableGutters sx={{ p: 0 }}>
                <ListItemButton
                  onClick={() => onItemClick(it)}
                  sx={{
                    alignItems: "flex-start",
                    borderRadius: 2,
                    px: 1,
                    py: 1,
                    gap: 1.25,
                    bgcolor: "background.paper",
                    boxShadow: it.read ? 0 : 1,
                    position: "relative",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemAvatar sx={{ mt: 0.5, mr: 2, minWidth: 0 }}>
                    <Avatar sx={{
                      width: 36,
                      height: 36,
                      fontSize: "1.2rem",
                      bgcolor: it.read ? "grey.200" : "primary.light"
                      }}>
                      {it.type === "deal" ? "D" : it.type === "activity" ? "A" : "S"}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: it.read ? 600 : 800, fontSize: "0.9rem" }}>
                        {it.title}
                      </Typography>
                    }
                    secondary={
                      <Stack spacing={0.5}>
                        {it.subtitle && (
                          <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                            {it.subtitle}
                          </Typography>
                        )}
                        <Typography variant="caption" sx={{fontSize: "0.7rem", color: "text.disabled"}}>
                          {timeAgo(it.createdAt)}
                        </Typography>
                      </Stack>
                    }
                  />
                  {!it.read && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "info.main",
                        position: "absolute",
                        top: 12,
                        right: 12,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Box>
          ))}
        </List>
      )}

      <Divider />

      <Box sx={{ p: 1.5, textAlign: "center" }}>
        <Button variant="text" onClick={onClose} sx={{ fontWeight: 700, fontSize: ".8rem" }}>
          Ver todo
        </Button>
      </Box>
    </Drawer>
  );
};

export default NotificationsPanel;

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""}`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""}`;
}