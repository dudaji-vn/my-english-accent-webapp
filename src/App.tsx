import { Suspense, lazy, useCallback, useEffect, useLayoutEffect } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ROUTER from "./shared/const/router.const";
import DrawerNavigate from "./components/drawer-navigate";
import Loading from "./components/loading";
import RecordSentenceList from "./pages/record/record-list";
import AudioRecorder from "audio-recorder-polyfill";
import { useLazyIsLoginQuery } from "./core/services";
import { setIsAuthenticated } from "@/core/store/index";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./core/store";
import persist from "./shared/utils/persist.util";

const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));
const RecordingPage = lazy(() => import("@/pages/record"));
const RecordingProgressPage = lazy(() => import("@/pages/record/record-progress"));
const RerecordingProgressPage = lazy(() => import("@/pages/club/club-rerecord-progress"));
const CertificatePage = lazy(() => import("@/pages/certificate"));
const CertificateUserPage = lazy(() => import("@/pages/certificate/certificate-user"));
const CertificateProgressPage = lazy(() => import("@/pages/certificate/certificate-progress"));
const ListenPage = lazy(() => import("@/pages/listen"));
const ManagePlaylistPage = lazy(() => import("@/pages/listen/manage-playlist"));
const CreatePlaylistPage = lazy(() => import("@/pages/listen/create-playlist"));
const SelectLecturePage = lazy(() => import("@/pages/listen/select-lecture"));
const NoLectureInListenPage = lazy(() => import("@/pages/listen/empty-playlist"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const LeaderBoardPage = lazy(() => import("@/pages/leader-board"));
const UserPlaylistPage = lazy(() => import("@/pages/leader-board/user-playlist"));
const LeaderBoardSelectLecturePage = lazy(() => import("@/pages/leader-board/select-lecture"));

const supportsWebm = typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported("audio/webm");

if (!supportsWebm) {
  window.MediaRecorder = AudioRecorder;
}

export const ProtectedRoute = ({ isShowDrawer }: { isShowDrawer?: boolean }) => {
  const [triggerIsLogin, { data }] = useLazyIsLoginQuery();
  const { isAuthenticated } = useAppSelector((state) => state.GlobalStore.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await triggerIsLogin().unwrap();
        if (!user) {
          dispatch(setIsAuthenticated(false));
          navigate(ROUTER.AUTH + ROUTER.LOGIN);
        } else {
          persist.updateProfile(user);
          dispatch(setIsAuthenticated(true));
        }
      } catch (err) {
        navigate(ROUTER.AUTH + ROUTER.LOGIN);
        dispatch(setIsAuthenticated(false));
      }
    };
    checkAuthentication();
    return () => {
      persist.setIsSelectListenLecture(false);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated && data) {
      navigate(ROUTER.AUTH + ROUTER.LOGIN);
    }
  }, [isAuthenticated]);
  if (!data) {
    return <Loading />;
  }
  return isShowDrawer ? <DrawerNavigate /> : <Outlet />;
};

export const PublishRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.GlobalStore.user);

  if (isAuthenticated) {
    return <Navigate to={ROUTER.ROOT} />;
  }

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
          {/** LEADER BOARD */}
          <Route path={ROUTER.LEADER_BOARD + "/:userId"} element={<UserPlaylistPage />} />
          <Route path={ROUTER.LEADER_BOARD_SELECT_LECTURE} element={<LeaderBoardSelectLecturePage />} />
        </Route>
        <Route path={ROUTER.ROOT} element={<AnonymousRoute />}>
          <Route path={ROUTER.CERTIFICATE_USER + "/:slug"} element={<CertificateUserPage />} />
        </Route>

        <Route path={ROUTER.ROOT} element={<ProtectedRoute isShowDrawer />}>
          <Route index element={<Navigate replace to={ROUTER.RECORD} />} />
          <Route path={ROUTER.RECORD} element={<RecordingPage />} />
          <Route path={ROUTER.RECORD} element={<RecordingPage />} />
          <Route path={ROUTER.CERTIFICATE} element={<CertificatePage />} />
          <Route path={ROUTER.LEADER_BOARD} element={<LeaderBoardPage />} />
          <Route path={ROUTER.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTER.LISTENING} element={<ListenPage />} />
          <Route path={ROUTER.LISTENING_EMPTY_PLAYLIST} element={<NoLectureInListenPage />} />
        </Route>
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
