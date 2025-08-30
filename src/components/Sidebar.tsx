import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ContactsIcon from "@mui/icons-material/Contacts";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useAuth } from "../auth/AuthContext";
import crmLogo from "../assets/img/Logo3.png"
import crmLogoIcon from "../assets/img/Logo2.png"

type Section = { label: string; icon: React.ReactNode; path: string };

const sections: Section[] = [
  { label: "Dashboard", icon: <DashboardIcon />,  path: "/" },
  { label: "Empresas", icon: <ApartmentIcon />,  path: "/empresas" },
  { label: "Contactos", icon: <ContactsIcon />,   path: "/contactos" },
  { label: "Deals", icon: <HandshakeIcon />,  path: "/deals" },
  { label: "Actividades", icon: <EventNoteIcon />,  path: "/actividades" },
];

const EXPANDED_WIDTH  = 251.5;
const COLLAPSED_WIDTH = 97.5;

const Sidebar: React.FC<{
  defaultCollapsed?: boolean;
  onOpenUserPanel?: () => void;
}> = ({ defaultCollapsed = false, onOpenUserPanel }) => {
  const location = useLocation();
  const navigate  = useNavigate();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const { user } = useAuth();

  const activeLabel = useMemo(() => {
    if (location.pathname === "/" || location.pathname.startsWith("/dashboard")) return "Dashboard";
    const found = sections.find(s => s.path !== "/" && location.pathname.startsWith(s.path));
    return found?.label ?? "";
  }, [location.pathname]);

  const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        transition: (t) => 
          t.transitions.create("width", { duration: t.transitions.duration.shorter }),
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          background: "#233044",
          borderRight: "1px solid #000",
          transition: (t) =>
            t.transitions.create("width", { duration: t.transitions.duration.shorter }),
          zIndex: (t) => t.zIndex.appBar - 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {!collapsed ? (
          <Box
            component="img"
            src={crmLogo}
            alt="CRM Logo"
            sx={{
              height: 34,
              flex: 1,
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        ) : (
          <Box
            component="img"
            src={crmLogoIcon}
            alt="CRM Logo Icon"
            sx={{
              height: 30,
              flex: 1,
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        )}

        <IconButton
          size="small"
          onClick={() => setCollapsed((c) => !c)}
          sx={{
            color: "#fff",
            bgcolor: "#1E293A",
            "&:hover": { bgcolor: "#202C3F" },
          }}
          aria-label={collapsed ? "Expandir" : "Colapsar"}
        >
          {collapsed ? <ChevronRightRoundedIcon sx={{ fontSize: 22 }} /> : <ChevronLeftRoundedIcon sx={{ fontSize: 22 }} />}
        </IconButton>
      </Box>

      <List sx={{ mt: 0.5, flex: 1, overflowY: "auto" }}>
        {sections.map(({ label, icon, path }) => {
          const isActive = label === activeLabel;

          const ItemButton = (
            <ListItemButton
              onClick={() => navigate(path)}
              sx={{
                backgroundColor: isActive ? "#1E293A" : "transparent",
                "&:hover": { backgroundColor: "#202C3F" },
                borderLeft: isActive ? "3.5px solid #fff" : "3.5px solid transparent",
                borderRadius: 2,
                px: collapsed ? 0.5 : 1.5,
                py: collapsed ? 1.25 : 1.25,
                minHeight: collapsed ? 75 : 50,
                display: "flex",
                flexDirection: collapsed ? "column" : "row",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                textAlign: collapsed ? "center" : "left",
                gap: collapsed ? 0.5 : 0,
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: collapsed ? 0 : 36,
                  mb: collapsed ? 0.5 : 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {icon}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                  sx={{
                    fontSize: collapsed ? "0.75rem" : "0.9rem",
                    fontWeight: isActive ? "bold" : "normal",
                    color: "#fff",
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: collapsed ? (COLLAPSED_WIDTH - 24) : "unset",
                    }}
                  >
                    {label}
                  </Typography>
                }
                sx={{ my: 0 }}
              />
            </ListItemButton>
          );

          return (
            <ListItem key={label} disablePadding>
              {collapsed ? (
                <Box sx={{ width: "100%" }}>{ItemButton}</Box>
              ) : (
                ItemButton
              )}
            </ListItem>
          );
        })}
      </List>

      <Box
        onClick={onOpenUserPanel}
        sx={{
          cursor: onOpenUserPanel ? "pointer" : "default",
          p: 2,
          background: "#1E293A",
        }}
      >
        {!collapsed ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Badge
              overlap="circular"
              variant="dot"
              color="success"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{
                "& .MuiBadge-badge": {
                  boxShadow: "0 0 0 2px #213245",
                },
              }}
            >
              <Avatar src={user?.AvatarUrl} alt={user?.nombre} sx={{ width: 37, height: 37 }}>
                {user?.nombre?.[0] ?? "U"}
              </Avatar>
            </Badge>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#fff",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.nombre ?? "Demo Admin"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.rol ?? "Admin"}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Badge
              overlap="circular"
              variant="dot"
              color="success"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              sx={{
                "& .MuiBadge-badge": { boxShadow: "0 0 0 2px #213245" },
              }}
            >
              <Avatar src={user?.AvatarUrl} alt={user?.nombre} sx={{ width: 37, height: 37 }}>
                {user?.nombre?.[0] ?? "U"}
              </Avatar>
            </Badge>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;