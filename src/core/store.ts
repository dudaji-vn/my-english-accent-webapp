import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { FakeUserApi, LectureApi, UserApi, VocabularyApi } from "@/core/services";
import RecordProgressApi from "@/core/services/recordProgress.service";
import ClubStudyApi from "@/core/services/club.service";
import ChallengeApi from "@/core/services/challenge.service";
import GlobalReducer from "@/core/store/index";
import RecordApi from "./services/record.service";
import ListenApi from "./services/listen.service";
import GoogleApi from "./services/google.service";

const middleware = [
  LectureApi.middleware,
  VocabularyApi.middleware,
  UserApi.middleware,
  RecordProgressApi.middleware,
  ClubStudyApi.middleware,
  ChallengeApi.middleware,
  FakeUserApi.middleware,
  RecordApi.middleware,
  ListenApi.middleware,
  GoogleApi.middleware,
] as any;

export const store = configureStore({
  reducer: {
    GlobalStore: GlobalReducer,
    LectureApi: LectureApi.reducer,
    VocabularyApi: VocabularyApi.reducer,
    UserApi: UserApi.reducer,
    RecordProgressApi: RecordProgressApi.reducer,
    ClubStudyApi: ClubStudyApi.reducer,
    ChallengeApi: ChallengeApi.reducer,
    FakeUserApi: FakeUserApi.reducer,
    RecordApi: RecordApi.reducer,
    ListenApi: ListenApi.reducer,
    GoogleApi: GoogleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
