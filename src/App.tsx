import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/config/router";
import { useAppSelector } from "./store/hook";
import Box from "@mui/material/Box";

function App() {
  const token = useAppSelector((state) => state.user.token);
  const routing = useRoutes(routes(!token));
  return <Box className="bg-gray-100 h-screen">{routing}</Box>;
}

export default App;
