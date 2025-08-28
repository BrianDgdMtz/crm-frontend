import React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

const MessagesBell: React.FC<
    {
        count: number;
        onClick: () => void
    }
> = ({ count, onClick }) => {
  return (
    <Tooltip title="Mensajes">
      <IconButton onClick={onClick} aria-label="Abrir mensajes" sx={{ width: 48, height: 48 }}>
        <Badge
          badgeContent={count}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.75rem",
              minWidth: 22,
              height: 22,
              borderRadius: 5,
              top: 1,
              right: 1,
            },
          }}
          >
          <ChatBubbleOutlineRoundedIcon 
            sx={{ fontSize: 26 }}
          />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default MessagesBell;