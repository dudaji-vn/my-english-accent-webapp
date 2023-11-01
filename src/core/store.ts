import { configureStore, ThunkAction, Action, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { LectureApi, UserApi, VocabularyApi } from "@/core/services";
import InitializeApi from "@/core/services/initialize.service";
import RecordProgressApi from "@/core/services/recordProgress.service";
import ClubStudyApi from "@/core/services/club.service";
import ChallengeApi from "@/core/services/challenge.service";

const middleware = [
  LectureApi.middleware,
  VocabularyApi.middleware,
  UserApi.middleware,
  InitializeApi.middleware,
  RecordProgressApi.middleware,
  ClubStudyApi.middleware,
  ChallengeApi.middleware,
] as any;

export const store = configureStore({
  reducer: {
    LectureApi: LectureApi.reducer,
    VocabularyApi: VocabularyApi.reducer,
    UserApi: UserApi.reducer,
    InitializeApi: InitializeApi.reducer,
    RecordProgressApi: RecordProgressApi.reducer,
    ClubStudyApi: ClubStudyApi.reducer,
    ChallengeApi: ChallengeApi.reducer,
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
