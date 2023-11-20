import { Suspense, lazy, useCallback, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import persist from "./shared/utils/persist.util";
import ROUTER from "./shared/const/router.const";
import DrawerNavigate from "./components/DrawerNavigate";
import Loading from "./components/Loading";
import RecordSentenceList from "./pages/Record/RecordList";

const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const RecordingPage = lazy(() => import("@/pages/Record"));
const RecordingProgressPage = lazy(() => import("@/pages/Record/RecordProgress"));
const RerecordingProgressPage = lazy(() => import("@/pages/Club/ClubRerecordProgress"));
const ClubPage = lazy(() => import("@/pages/Club"));
const AddNewClubPage = lazy(() => import("@/pages/Club/AddNewClub"));
const ClubAddMemberPage = lazy(() => import("@/pages/Club/ClubAddMember"));
const ClubRecordingPage = lazy(() => import("@/pages/Club/ClubRecording"));
const ClubListeningPage = lazy(() => import("@/pages/Club/ClubListening"));
const ClubRecordingSummaryPage = lazy(() => import("@/pages/Club/ClubRecordingSummary"));
const ClubDetailPage = lazy(() => import("@/pages/Club/ClubDetail"));
const ClubStudyPage = lazy(() => import("@/pages/Club/ClubStudy"));
const ClubMemberPage = lazy(() => import("@/pages/Club/ClubMember"));
const ClubInfoPage = lazy(() => import("@/pages/Club/ClubInfo"));
const ListenPage = lazy(() => import("@/pages/Listen"));
const ManagePlaylist = lazy(() => import("@/pages/Listen/ManagePlaylist"));
const CreatePlaylist = lazy(() => import("@/pages/Listen/CreatePlaylist"));
const SelectLecture = lazy(() => import("@/pages/Listen/SelectLecture"));
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
          <Route path={ROUTER.RECORD + "/:category"} element={<RecordingProgressPage />} />
          <Route path={ROUTER.RECORD_LIST} element={<RecordSentenceList />} />
          <Route path={ROUTER.RERECORD + "/:category"} element={<RerecordingProgressPage />} />
          {/* CLUB DETAIL*/}
          <Route path={ROUTER.CLUB_DETAIL} element={<ClubDetailPage />}>
            <Route index path={removeSlash(ROUTER.CLUB_STUDY) + "/:clubId"} element={<ClubStudyPage />} />
            <Route path={removeSlash(ROUTER.CLUB_MEMBER) + "/:clubId"} element={<ClubMemberPage />} />
            <Route path={removeSlash(ROUTER.CLUB_INFO) + "/:clubId"} element={<ClubInfoPage />} />
          </Route>

          <Route path={ROUTER.CLUB_RECORDING_SUMMARY} element={<ClubRecordingSummaryPage />} />
          <Route path={ROUTER.CLUB_RECORDING} element={<ClubRecordingPage />} />
          <Route path={ROUTER.CLUB_LISTENING} element={<ClubListeningPage />} />
          <Route path={ROUTER.ADD_CLUB} element={<AddNewClubPage />} />
          <Route path={ROUTER.CLUB_ADD_MEMBER} element={<ClubAddMemberPage />} />

          {/* LISTEN  */}
          <Route path={ROUTER.LISTENING + ROUTER.MANAGE_PLAYLIST} element={<ManagePlaylist />} />
          <Route path={ROUTER.LISTENING + ROUTER.CREATE_PLAYLIST} element={<CreatePlaylist />} />
          <Route path={ROUTER.LISTENING + ROUTER.SELECT_LECTURE} element={<SelectLecture />} />
        </Route>

        <Route path={ROUTER.ROOT} element={<ProtectedRoute isShowDrawer />}>
          <Route index element={<Navigate replace to={ROUTER.RECORD} />} />
          <Route path={ROUTER.RECORD} element={<RecordingPage />} />
          {/* TODO: create LISTENING PAGE */}
          <Route path={ROUTER.LISTENING} element={<ListenPage />} />
          {/* CLUB */}
          <Route path={ROUTER.CLUB} element={<ClubPage />} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
