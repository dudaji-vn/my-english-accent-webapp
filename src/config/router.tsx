import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import ROUTER from "@/shared/const/router.const";
import HomePage from "@/pages/Home";
import Login from "@/pages/Auth/Login";
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
import ClubRecordingPage from "@/pages/Club/ClubRecording";
import ClubListeningPage from "@/pages/Club/ClubListening";
import ClubRecordingSummaryPage from "@/pages/Club/ClubRecordingSummary";
import Register from "@/pages/Auth/Register";

function RequireAuth({ isLoggedIn, isShowNavbar, children }: { isLoggedIn: boolean; isShowNavbar: boolean; children: ReactElement }) {
  const location = useLocation();
  return isLoggedIn === true ? (
    <>
      {isShowNavbar && <Navbar />}
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
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.LOGIN,
    element: !isLoggedIn ? <Login /> : <Navigate to={ROUTER.ROOT} />,
  },
  {
    path: ROUTER.REGISTER,
    element: !isLoggedIn ? <Register /> : <Navigate to={ROUTER.ROOT} />,
  },
  {
    path: ROUTER.RECORD,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <RecordingPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.RECORD + "/:category",
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <RecordingProgressPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.RERECORD + "/:category",
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <RerecordingProgressPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.RECORD + "/:category" + ROUTER.SUMMARY,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <RecordSummaryPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.CLUB,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <ClubPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.ADD_CLUB,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <AddNewClubPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.CLUB_ADD_MEMBER,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <ClubAddMemberPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.CLUB_RECORDING,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar={false}>
        <ClubRecordingPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.CLUB_RECORDING_SUMMARY,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar={false}>
        <ClubRecordingSummaryPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.CLUB_LISTENING,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar={false}>
        <ClubListeningPage />
      </RequireAuth>
    ),
  },
  {
    path: ROUTER.CLUB_DETAIL,
    element: <Navigate to={ROUTER.CLUB_DETAIL + ROUTER.CLUB_STUDY} replace />,
  },
  {
    path: ROUTER.CLUB_DETAIL,
    element: (
      <RequireAuth isLoggedIn={isLoggedIn} isShowNavbar>
        <ClubDetailPage />
      </RequireAuth>
    ),
    children: [
      {
        path: ROUTER.CLUB_STUDY + "/:clubId",
        element: <ClubStudyPage />,
      },
      {
        path: ROUTER.CLUB_MEMBER + "/:clubId",
        element: <ClubMemberPage />,
      },
      {
        path: ROUTER.CLUB_INFO + "/:clubId",
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
