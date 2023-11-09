import { Suspense, lazy, useCallback, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import persist from "./shared/utils/persist.util";
import ROUTER from "./shared/const/router.const";
import DrawerNavigate from "./components/Drawer";
import Loading from "./components/Loading";
import RecordSentenceList from "./pages/Record/RecordList";

const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const RecordingPage = lazy(() => import("@/pages/Record"));
const RecordingProgressPage = lazy(() => import("@/pages/Record/RecordProgress"));
const RecordSummaryPage = lazy(() => import("@/pages/Record/RecordSummary"));
const RerecordingProgressPage = lazy(() => import("@/pages/Record/RerecordProgress"));
const ClubPage = lazy(() => import("@/pages/Club"));
const AddNewClubPage = lazy(() => import("@/pages/Club/AddNewClub"));
const ClubAddMemberPage = lazy(() => import("@/pages/Club/ClubAddMember"));
const ClubRecordingPage = lazy(() => import("@/pages/Club/ClubRecording"));
const ClubListeningPage = lazy(() => import("@/pages/Club/ClubListening"));
const ClubRecordingSummaryPage = lazy(() => import("@/pages/Club/ClubRecordingSummary"));
const ClubStudyPage = lazy(() => import("@/pages/Club/ClubStudy"));
const ClubMemberPage = lazy(() => import("@/pages/Club/ClubMember"));
const ClubInfoPage = lazy(() => import("@/pages/Club/ClubInfo"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

export const ProtectedRoute = ({ isShowDrawer }: { isShowDrawer?: boolean }) => {
  const token = persist.getToken();
  return !token ? <Navigate to={ROUTER.AUTH + ROUTER.LOGIN} /> : isShowDrawer ? <DrawerNavigate /> : <Outlet />;
};

export const PublishRoute = () => {
  const navigate = useNavigate();
  const token = persist.getToken();

  useEffect(() => {
    if (token) {
      navigate(ROUTER.ROOT);
    }
  }, [token]);

  return <Outlet />;
};

function App() {
  // return <Box className='bg-gray-100 min-h-screen h-full flex flex-col'>{routing}</Box>;
  const removeSlash = useCallback((value: string) => {
    return value.replace("/", "");
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTER.AUTH} element={<PublishRoute />}>
          <Route index path={removeSlash(ROUTER.LOGIN)} element={<Login />} />
          <Route path={removeSlash(ROUTER.REGISTER)} element={<Register />} />
        </Route>
        <Route path={ROUTER.ROOT} element={<ProtectedRoute />}>
          {/* RECORD */}
          <Route path={removeSlash(ROUTER.RECORD) + "/:category"} element={<RecordingProgressPage />} />
          <Route path={removeSlash(ROUTER.RECORD_LIST)} element={<RecordSentenceList />} />
          <Route path={removeSlash(ROUTER.RERECORD) + "/:category"} element={<RerecordingProgressPage />} />
          {/* CLUB */}
          <Route path={ROUTER.CLUB_DETAIL + ROUTER.CLUB_STUDY + "/:clubId"} element={<ClubStudyPage />} />
          <Route path={ROUTER.CLUB_DETAIL + ROUTER.CLUB_MEMBER + "/:clubId"} element={<ClubMemberPage />} />
          <Route path={ROUTER.CLUB_DETAIL + ROUTER.CLUB_INFO + "/:clubId"} element={<ClubInfoPage />} />
        </Route>
        <Route path={ROUTER.ROOT} element={<ProtectedRoute isShowDrawer />}>
          <Route index element={<RecordingPage />} />
          <Route path={removeSlash(ROUTER.RECORD)} element={<RecordingPage />} />

          {/* TODO: create LISTENING PAGE */}
          <Route path={ROUTER.LISTENING} element={<RecordingPage />} />
          {/* CLUB */}
          <Route path={ROUTER.CLUB} element={<ClubPage />} />
          <Route path={ROUTER.ADD_CLUB} element={<AddNewClubPage />} />
          <Route path={ROUTER.CLUB_ADD_MEMBER} element={<ClubAddMemberPage />} />
          <Route path={ROUTER.CLUB_RECORDING} element={<ClubRecordingPage />} />
          <Route path={ROUTER.CLUB_RECORDING_SUMMARY} element={<ClubRecordingSummaryPage />} />
          <Route path={ROUTER.CLUB_LISTENING} element={<ClubListeningPage />} />
          {/* CLUB DETAIL */}
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
