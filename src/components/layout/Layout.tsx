import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import HeaderBar from "./Header/HeaderBar";
import NotificationsPanel from "./Header/panels/NotificationsPanel";
import MessagesPanel from "./Header/panels/MessagesPanel";
import UserPanel from "./Header/panels/UserPanel";
import { useAuth } from "../../auth/AuthContext";
import { notificationsMock as initNotis } from "../../mock/notificacionesMock";
import { messagesMock as initMsgs } from "../../mock/mensajesMock";
import type { NotificationItem } from "../../types/notifications";
import { countUnreadNotifications } from "../../types/notifications";
import type { MessageItem } from "../../types/messages";
import { countUnreadMessages } from "../../types/messages";
import { resolvePageTitle } from "../../utils/pageTitle";

const APP_NAME = "Synapse CRM";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { pathname } = useLocation();
  const currentOutlet = useOutlet();

  // Estado UI
  const [anchorElNotis, setAnchorElNotis] = useState<HTMLElement | null>(null);
  const [anchorElMsgs, setAnchorElMsgs] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [loadingNotis, setLoadingNotis] = useState(false);
  const [loadingMsgs, setLoadingMsgs] = useState(false);

  // Datos (mocks)
  const [notis, setNotis] = useState<NotificationItem[]>(initNotis);
  const [msgs, setMsgs] = useState<MessageItem[]>(initMsgs);

  // Contadores
  const unreadNotis = useMemo(() => countUnreadNotifications(notis), [notis]);
  const unreadMsgs = useMemo(() => countUnreadMessages(msgs), [msgs]);

  useEffect(() => {
    const title = resolvePageTitle(pathname);
    document.title = title === "CRM" ? APP_NAME : `${title} - ${APP_NAME}`;
  }, [pathname]);

  // Handlers de apertura con latencia simulada
  const openNotifications = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotis(e.currentTarget);
    setLoadingNotis(true);
    setTimeout(() => setLoadingNotis(false), 300);
  };

  const openMessages = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElMsgs(e.currentTarget);
    setLoadingMsgs(true);
    setTimeout(() => setLoadingMsgs(false), 300);
  };

  // Acciones
  const markAllNotisRead = () =>
    setNotis((arr) => arr.map((i) => ({ ...i, read: true })));

  const markAllMsgsRead = () =>
    setMsgs((arr) => arr.map((i) => ({ ...i, read: true })));

  const onClickNotif = (it: NotificationItem) => {
    setNotis((arr) => arr.map((n) => (n.id === it.id ? { ...n, read: true } : n)));
    setAnchorElNotis(null);
    if (it.href) navigate(it.href);
  };

  const onClickMsg = (it: MessageItem) => {
    setMsgs((arr) => arr.map((m) => (m.id === it.id ? { ...m, read: true } : m)));
    setAnchorElMsgs(null);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <HeaderBar
          notificationsCount={unreadNotis}
          messagesCount={unreadMsgs}
          onOpenNotifications={openNotifications}
          onOpenMessages={openMessages}
          onOpenUserPanel={(e) => setAnchorElUser(e.currentTarget)}
          onToggleSidebar={() => setMobileOpen(!mobileOpen)}
          avatarUrl={user?.AvatarUrl}
        />

        <Box component="main" sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {currentOutlet}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>

      <NotificationsPanel
        anchorEl={anchorElNotis}
        onClose={() => setAnchorElNotis(null)}
        items={notis}
        onMarkAllRead={markAllNotisRead}
        onItemClick={onClickNotif}
        loading={loadingNotis}
      />

      <MessagesPanel
        anchorEl={anchorElMsgs}
        onClose={() => setAnchorElMsgs(null)}
        items={msgs}
        onMarkAllRead={markAllMsgsRead}
        onItemClick={onClickMsg}
        loading={loadingMsgs}
      />

      <UserPanel
        anchorEl={anchorElUser}
        onClose={() => setAnchorElUser(null)}
        user={{
          name: user?.nombre ?? "Demo Admin",
          email: user?.email ?? "demo@crm.com",
          role: user?.rol ?? "admin",
          avatarUrl: user?.AvatarUrl,
        }}
        onGoHome={() => navigate("/")}
        onProfile={() => navigate("/perfil")}
        onSettings={() => navigate("/configuracion")}
        onLogout={() => {
          logout();
          navigate("/login");
        }}
      />
    </Box>
  );
};

export default Layout;