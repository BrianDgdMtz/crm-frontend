import React from "react";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Badge, Avatar, useTheme } from "@mui/material";
import NotificationsBell from "./NotificationsBell";
import MessagesBell from "./MessagesBell";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useAppTheme } from "../../../theme/ThemeContextProvider";
import { GlobalSearch } from "./GlobalSearch";
import { Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

type HeaderBarProps = {
  notificationsCount: number;
  messagesCount: number;
  onOpenNotifications: (e: React.MouseEvent<HTMLElement>) => void;
  onOpenMessages: (e: React.MouseEvent<HTMLElement>) => void;
  onOpenUserPanel: (e: React.MouseEvent<HTMLElement>) => void;
  onToggleSidebar?: () => void;
  avatarUrl?: string;
};

const HeaderBar: React.FC<HeaderBarProps> = ({
  notificationsCount,
  messagesCount,
  onOpenNotifications,
  onOpenMessages,
  onOpenUserPanel,
  onToggleSidebar,
  avatarUrl,
}) => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useAppTheme();
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        top: 0,
        backgroundColor: theme.palette.mode === 'light' ? "rgba(255,255,255,0.65)" : "rgba(30,41,59,0.65)",
        backdropFilter: "blur(12px) saturate(120%)",
        WebkitBackdropFilter: "blur(12px) saturate(120%)",
        zIndex: (t) => t.zIndex.appBar,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ minHeight: 64, display: "flex", gap: 0.2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ mr: 2, display: { md: 'none' }, color: 'text.secondary' }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setSearchOpen(true)}
          startIcon={<SearchIcon />}
          sx={{
            color: 'text.secondary',
            borderColor: 'divider',
            bgcolor: 'action.hover',
            textTransform: 'none',
            justifyContent: 'flex-start',
            width: { xs: 150, sm: 250 },
            mr: 2,
            '&:hover': { bgcolor: 'action.selected' }
          }}
        >
          Buscar... 
          <Box component="span" sx={{ ml: 'auto', opacity: 0.6, fontSize: '0.75rem', border: '1px solid', borderColor: 'divider', borderRadius: 1, px: 0.5 }}>
            ⌘K
          </Box>
        </Button>
        <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

        <Tooltip title={mode === 'light' ? 'Modo Oscuro' : 'Modo Claro'}>
          <IconButton onClick={toggleColorMode} size="small" sx={{ ml: 1, mr: 1 }}>
            {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
        </Tooltip>

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