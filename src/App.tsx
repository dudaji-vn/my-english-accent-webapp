import { useRoutes } from "react-router-dom";
import routes from "@/config/router";
import Box from "@mui/material/Box";
import persist from "./shared/utils/persist.util";

function App() {
  const token = persist.getToken();

  const routing = useRoutes(routes(!!token));
  return <Box className='bg-gray-100 min-h-screen h-full flex flex-col'>{routing}</Box>;
}

export default App;
