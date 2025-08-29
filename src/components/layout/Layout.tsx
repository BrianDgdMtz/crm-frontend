import React, { useMemo, useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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

  // Estado UI
  const [openPanel, setOpenPanel] = useState<"notifications" | "messages" | null>(null);
  const [openUserPanel, setOpenUserPanel] = useState(false);

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
  const openNotifications = () => {
    setOpenPanel("notifications");
    setLoadingNotis(true);
    setTimeout(() => setLoadingNotis(false), 300);
  };

  const openMessages = () => {
    setOpenPanel("messages");
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
    setOpenPanel(null);
    if (it.href) navigate(it.href);
  };

  const onClickMsg = (it: MessageItem) => {
    setMsgs((arr) => arr.map((m) => (m.id === it.id ? { ...m, read: true } : m)));
    setOpenPanel(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <HeaderBar
          notificationsCount={unreadNotis}
          messagesCount={unreadMsgs}
          onOpenNotifications={openNotifications}
          onOpenMessages={openMessages}
          onOpenUserPanel={() => setOpenUserPanel(true)}
          avatarUrl={user?.AvatarUrl}
        />

        <main style={{ flex: 1, padding: "2rem", background: "#F7F9FC" }}>
          <Outlet />
        </main>
      </div>

      <NotificationsPanel
        open={openPanel === "notifications"}
        onClose={() => setOpenPanel(null)}
        items={notis}
        onMarkAllRead={markAllNotisRead}
        onItemClick={onClickNotif}
        loading={loadingNotis}
      />

      <MessagesPanel
        open={openPanel === "messages"}
        onClose={() => setOpenPanel(null)}
        items={msgs}
        onMarkAllRead={markAllMsgsRead}
        onItemClick={onClickMsg}
        loading={loadingMsgs}
      />

      <UserPanel
        open={openUserPanel}
        onClose={() => setOpenUserPanel(false)}
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
    </div>
  );
};

export default Layout;