import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import AppGate from "./AppGate";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeContextProvider>
          <Toaster richColors position="bottom-right" />
          <AppGate>
            <App />
          </AppGate>
        </ThemeContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);