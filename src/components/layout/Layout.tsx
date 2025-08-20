import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />
    <main style={{ flex: 1, padding: "2rem", background: "#f9f5f4" }}>
      <Outlet />
    </main>
  </div>
);

export default Layout;
