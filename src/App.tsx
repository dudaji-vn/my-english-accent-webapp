import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/config/router";
import { useAppSelector } from "./store/hook";

function App() {
  const token = useAppSelector((state) => state.user.token);
  const routing = useRoutes(routes(!!token));
  return <>{routing}</>;
}

export default App;
