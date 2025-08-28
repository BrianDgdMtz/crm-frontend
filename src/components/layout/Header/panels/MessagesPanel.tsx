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
import type { MessageItem } from "../../../../types/messages";

type Props = {
  open: boolean;
  onClose: () => void;
  items: MessageItem[];
  onMarkAllRead: () => void;
  onItemClick: (item: MessageItem) => void;
  loading?: boolean;
};

const MessagesPanel: React.FC<Props> = ({
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
          width: { xs: "100%", sm: 420 },
          borderRadius: { xs: 0, sm: "16px 0 0 16px" },
          overflow: "hidden",
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
        <Typography variant="h6" fontWeight={800}>
          Mensajes
        </Typography>

        <Stack direction="row" spacing={1}>
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
              <DoneAllRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClose} size="small" aria-label="Close panel">
            <CloseRoundedIcon fontSize="small" />
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
            ¡No tienes mensajes nuevos!
          </Typography>
        </Box>
      ) : (
        <List sx={{ py: 1.5 }}>
          {items.map((it) => (
            <Box key={it.id} sx={{ px: 2.5, mb: 1.5 }}>
              <ListItem disableGutters sx={{ p: 0 }}>
                <ListItemButton
                  onClick={() => onItemClick(it)}
                  sx={{
                    alignItems: "flex-start",
                    borderRadius: 2,
                    px: 1.25,
                    py: 1.25,
                    gap: 1,
                    bgcolor: "background.paper",
                    boxShadow: it.read ? 0 : 1,
                    position: "relative",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemAvatar sx={{ mt: 0.5, mr: 1 }}>
                    <Avatar
                        src={it.from.avatarUrl}
                        sx={{ bgcolor: it.read ? "grey.200" : "primary.light" }}
                    >
                      {it.from.name[0]}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: it.read ? 600 : 800 }}>
                        {it.from.name}
                      </Typography>
                    }
                    secondary={
                      <Stack spacing={0.5}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {it.preview}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
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

      <Box sx={{ p: 2, textAlign: "center" }}>
        <Button variant="text" onClick={onClose} sx={{ fontWeight: 700 }}>
          Ver todo
        </Button>
      </Box>
    </Drawer>
  );
};

export default MessagesPanel;

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
