import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ContactsIcon from "@mui/icons-material/Contacts";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EventNoteIcon from "@mui/icons-material/EventNote";

const sections = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Empresas", icon: <ApartmentIcon />, path: "/" },
  { label: "Contactos", icon: <ContactsIcon />, path: "/contactos" },
  { label: "Deals", icon: <HandshakeIcon />, path: "/deals" },
  { label: "Actividades", icon: <EventNoteIcon />, path: "/actividades" },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determina cuál sección está activa en base al pathname
  const getActiveSection = () => {
    // La sección empresas es "/" y también debe activarse para rutas como /empresas/:id
    if (location.pathname === "/" || location.pathname.startsWith("/empresas")) return "Empresas";
    const found = sections.find((sec) => sec.path !== "/" && location.pathname.startsWith(sec.path));
    return found?.label ?? "";
  };

  const activeSection = getActiveSection();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 220,
          boxSizing: "border-box",
          background: "#f9f5f4",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <Box sx={{ p: 2, pb: 0 }}>
        <Typography variant="h6" fontWeight="bold" color="primary" sx={{ letterSpacing: 1 }}>
          CRM LOGO
        </Typography>
      </Box>
      <List>
        {sections.map(({ label, icon, path }) => (
          <ListItem
            key={label}
            disablePadding
            sx={{
              background: label === activeSection ? "#e6dfdd" : "inherit",
              borderLeft: label === activeSection ? "4px solid #1976d2" : "4px solid transparent",
              "&:hover": {
                background: "#ece6e4",
              },
            }}
          >
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemIcon sx={{ color: "#424242" }}>{icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    fontWeight={label === activeSection ? "bold" : "normal"}
                  >
                    {label}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
