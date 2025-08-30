import { Box } from "@mui/material";
import Lottie from "lottie-react";
import splashAnim from "../../assets/Analytics Character Animation.json";

const SplashScreen = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    aria-label="Cargando aplicación"
  >
    <Lottie animationData={splashAnim} loop style={{ width: 350, height: 350 }} />
  </Box>
);

export default SplashScreen;