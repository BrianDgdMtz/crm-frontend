import { useEffect, useState } from "react";
import SplashScreen from "./components/ui/SplashScreen";

const SPLASH_MS = Number(import.meta.env.VITE_SPLASH_MS ?? 1300);

export default function AppGate({ children }: { children: React.ReactNode }) {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await new Promise((r) => setTimeout(r, SPLASH_MS));
      if (mounted) setBooting(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (booting) return <SplashScreen />;
  return <>{children}</>;
}