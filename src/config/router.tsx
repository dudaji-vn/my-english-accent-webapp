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
import RerecordingProgressPage from "@/pages/Record/RerecordProgress";
import ClubPage from "@/pages/Club";
import AddNewClubPage from "@/pages/Club/AddNewClub";
import ClubDetailPage from "@/pages/Club/ClubDetail";
import ClubStudyPage from "@/pages/Club/ClubStudy";
import ClubMemberPage from "@/pages/Club/ClubMember";
import ClubInfoPage from "@/pages/Club/ClubInfo";
import ClubAddMemberPage from "@/pages/Club/ClubAddMember";

function RequireAuth({ isLoggedIn, children }: { isLoggedIn: boolean; children: ReactElement }) {
  const location = useLocation();
  return isLoggedIn === true ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to='/login' replace state={{ path: location.pathname }} />
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
    path: ROUTER.RERECORD + "/:category",
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <RerecordingProgressPage />
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
    path: ROUTER.CLUB,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <ClubPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.ADD_CLUB,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <AddNewClubPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.CLUB_ADD_MEMBER,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <ClubAddMemberPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.CLUB_DETAIL,
    element: <Navigate to={ROUTER.CLUB_DETAIL + "/" + ROUTER.CLUB_STUDY} replace />,
  },
  {
    path: ROUTER.CLUB_DETAIL,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn}>
        <ClubDetailPage />
      </RequireAuth>
    ),
    children: [
      {
        path: ROUTER.CLUB_STUDY,
        element: <ClubStudyPage />,
      },
      {
        path: ROUTER.CLUB_MEMBER,
        element: <ClubMemberPage />,
      },
      {
        path: ROUTER.CLUB_INFO,
        element: <ClubInfoPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
