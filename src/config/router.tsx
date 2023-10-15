import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import ROUTER from "@/shared/const/router.const";
import HomePage from "@/pages/Home";
import Login from "@/pages/Auth";
import NotFoundPage from "@/pages/NotFound";
import RecordingPage from "@/pages/Record";
import Navbar from "@/components/Navbar";
import RecordingProgressPage from "@/pages/Record/RecordProgress";
import RecordSummaryPage from "@/pages/Record/RecordSummary";
import ListenPage from "@/pages/Listen";
import ChooseUserPage from "@/pages/Listen/ChooseUser";
import IndividualPage from "@/pages/Listen/Individual";
import TeamPage from "@/pages/Listen/Team";
import { useGetRecordsQuery, useGetTopicsQuery } from "@/core/services";

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
    path: ROUTER.RECORD + "/:category",
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <RecordingProgressPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.RECORD + "/:category" + ROUTER.SUMMARY,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <RecordSummaryPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.LISTENING,
    element: (
      <Navigate to={ROUTER.LISTENING + "/" + ROUTER.INDIVIDUAL} replace />
    ),
  },
  {
    path: ROUTER.LISTENING,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <ListenPage />
      </RequireAuth>
    ),

    children: [
      {
        path: ROUTER.INDIVIDUAL,
        element: <IndividualPage />,
      },
      {
        path: ROUTER.TEAM,
        element: <TeamPage />,
      },
    ],
  },
  {
    path: ROUTER.LISTENING + ROUTER.ADDUSER,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <ChooseUserPage />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
