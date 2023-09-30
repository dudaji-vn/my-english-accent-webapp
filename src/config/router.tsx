import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import ROUTER from "@/shared/const/router.const";
import Home from "@/pages/Home";
import Login from "@/pages/Auth";
import PageNotFound from "@/pages/NotFound";

function RequireAuth({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: ReactElement;
}) {
  const location = useLocation();
  return isLoggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

const routes = (isLoggedIn: boolean) => [
  {
    path: ROUTER.ROOT,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.LOGIN,
    element: !isLoggedIn ? <Login /> : <Navigate to={ROUTER.ROOT} />,
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;
