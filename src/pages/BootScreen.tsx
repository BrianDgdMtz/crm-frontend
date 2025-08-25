import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SplashScreen from "../components/ui/SplashScreen";

const BOOT_MS = Number(import.meta.env.VITE_SPLASH_AFTER_LOGIN_MS ?? 1300);

const BootScreen: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const to = params.get("to") || "/";

  useEffect(() => {
    let mounted = true;
    (async () => {
      await new Promise((r) => setTimeout(r, BOOT_MS));
      if (mounted) navigate(to, { replace: true });
    })();
    return () => { mounted = false; };
  }, [navigate, to]);

  return <SplashScreen />;
};

export default BootScreen;