import { Suspense, lazy, useCallback, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import persist from "./shared/utils/persist.util";
import ROUTER from "./shared/const/router.const";
import DrawerNavigate from "./components/DrawerNavigate";
import Loading from "./components/Loading";
import RecordSentenceList from "./pages/Record/RecordList";
import AudioRecorder from "audio-recorder-polyfill";

const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const RecordingPage = lazy(() => import("@/pages/Record"));
const RecordingProgressPage = lazy(() => import("@/pages/Record/RecordProgress"));
const RerecordingProgressPage = lazy(() => import("@/pages/Club/ClubRerecordProgress"));
const CertificatePage = lazy(() => import("@/pages/Certificate"));
const CertificateUserPage = lazy(() => import("@/pages/Certificate/CertificateUser"));
const CertificateProgressPage = lazy(() => import("@/pages/Certificate/CertificateProgress"));
const ListenPage = lazy(() => import("@/pages/Listen"));
const ManagePlaylistPage = lazy(() => import("@/pages/Listen/ManagePlaylist"));
const CreatePlaylistPage = lazy(() => import("@/pages/Listen/CreatePlaylist"));
const SelectLecturePage = lazy(() => import("@/pages/Listen/SelectLecture"));
const NoLectureInListenPage = lazy(() => import("@/pages/Listen/EmptyPlaylist"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const supportsWebm = typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported("audio/webm");

if (!supportsWebm) {
  window.MediaRecorder = AudioRecorder;
}

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
const AnonymousRoute = () => {
  return <Outlet />;
};

function App() {
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
          {/* RECORD DETAIL */}
          <Route path={ROUTER.RECORD + "/:category"} element={<RecordingProgressPage />} />
          <Route path={ROUTER.RECORD_LIST} element={<RecordSentenceList />} />
          <Route path={ROUTER.RERECORD + "/:category"} element={<RerecordingProgressPage />} />

          {/* LISTEN  */}
          <Route path={ROUTER.LISTENING + ROUTER.MANAGE_PLAYLIST} element={<ManagePlaylistPage />} />
          <Route path={ROUTER.LISTENING + ROUTER.CREATE_PLAYLIST} element={<CreatePlaylistPage />} />
          <Route path={ROUTER.LISTENING + ROUTER.SELECT_LECTURE} element={<SelectLecturePage />} />
          {/** CERTIFICATE */}
          <Route path={ROUTER.CERTIFICATE + "/:category"} element={<CertificateProgressPage />} />
        </Route>
        <Route path={ROUTER.ROOT} element={<AnonymousRoute />}>
          <Route path={ROUTER.CERTIFICATE_USER + "/:userId"} element={<CertificateUserPage />} />
        </Route>

        <Route path={ROUTER.ROOT} element={<ProtectedRoute isShowDrawer />}>
          <Route index element={<Navigate replace to={ROUTER.RECORD} />} />
          <Route path={ROUTER.RECORD} element={<RecordingPage />} />
          <Route path={ROUTER.RECORD} element={<RecordingPage />} />
          <Route path={ROUTER.CERTIFICATE} element={<CertificatePage />} />
          <Route path={ROUTER.LISTENING} element={<ListenPage />} />
          <Route path={ROUTER.LISTENING_EMPTY_PLAYLIST} element={<NoLectureInListenPage />} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
