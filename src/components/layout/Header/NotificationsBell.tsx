import React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

const NotificationsBell: React.FC<
    {
        count: number;
        onClick: () => void
    }
> = ({ count, onClick }) => {
  return (
    <Tooltip title="Notificaciones">
      <IconButton onClick={onClick} aria-label="Abrir notificaciones" sx={{ width: 48, height: 48 }}>
        <Badge
          badgeContent={count}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.70rem",
              minWidth: 20,
              height: 20,
              borderRadius: 5,
              top: 2,
              right: 2,
            },
          }}
        >
          <NotificationsNoneRoundedIcon
            sx={{ fontSize: 24 }}
          />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default NotificationsBell;