import { useRoutes } from "react-router-dom";
import routes from "@/config/router";
import Box from "@mui/material/Box";
import persist from "./shared/utils/persist.util";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState<string | null>(() => persist.getToken());

  useEffect(() => {
    window.addEventListener("storage", () => {
      setToken(() => persist.getToken());
      console.log("token::", persist.getToken());
    });
    return () => window.removeEventListener("storage", () => {});
  }, []);

  const routing = useRoutes(routes(!!token));
  return <Box className='bg-gray-100 min-h-screen h-full flex flex-col'>{routing}</Box>;
}

export default App;
