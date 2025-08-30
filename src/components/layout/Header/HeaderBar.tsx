import React from "react";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Badge, Avatar } from "@mui/material";
import NotificationsBell from "./NotificationsBell";
import MessagesBell from "./MessagesBell";

type HeaderBarProps = {
  notificationsCount: number;
  messagesCount: number;
  onOpenNotifications: () => void;
  onOpenMessages: () => void;
  onOpenUserPanel: (e: React.MouseEvent<HTMLElement>) => void;
  avatarUrl?: string;
};

const HeaderBar: React.FC<HeaderBarProps> = ({
  notificationsCount,
  messagesCount,
  onOpenNotifications,
  onOpenMessages,
  onOpenUserPanel,
  avatarUrl,
}) => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        top: 0,
        backgroundColor: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px) saturate(120%)",
        WebkitBackdropFilter: "blur(12px) saturate(120%)",
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ minHeight: 64, display: "flex", gap: 0.2 }}>
        <Box sx={{ flexGrow: 1 }} />
        <NotificationsBell count={notificationsCount} onClick={onOpenNotifications} />
        <MessagesBell count={messagesCount} onClick={onOpenMessages} />
        <Tooltip title="Cuenta">
          <IconButton onClick={onOpenUserPanel} size="small" sx={{ ml: 1 }}>
            <Badge
              overlap="circular"
              variant="dot"
              color="success"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar src={avatarUrl} alt="User" sx={{ width: 37, height: 37 }} />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;