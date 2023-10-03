import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import ROUTER from "@/shared/const/router.const";
import HomePage from "@/pages/Home";
import Login from "@/pages/Auth";
import NotFoundPage from "@/pages/NotFound";
import RecordingPage from "@/pages/Record";
import Navbar from "@/components/Navbar";

function RequireAuth({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: ReactElement;
}) {
  const location = useLocation();
  return isLoggedIn === true ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

const routes = (isLoggedIn: boolean) => [
  {
    path: ROUTER.ROOT,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.LOGIN,
    element: !isLoggedIn ? <Login /> : <Navigate to={ROUTER.ROOT} />,
  },
  {
    path: ROUTER.RECORD,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <RecordingPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.LISTENING,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <RecordingPage />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
