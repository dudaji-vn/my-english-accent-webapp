import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import recordPageReduer from "@/store/RecordPageStore";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { LectureApi, UserApi, VocabularyApi } from "@/core/services";
import InitializeApi from "@/core/services/initialize.service";
import RecordProgressApi from "@/core/services/recordProgress.service";
import ClubStudyApi from "@/core/services/club.service";
import ChallengeApi from "@/core/services/challenge.service";
import FakeUserApi from "@/core/services/fake.service";

const middleware = [
  LectureApi.middleware,
  VocabularyApi.middleware,
  UserApi.middleware,
  InitializeApi.middleware,
  RecordProgressApi.middleware,
  ClubStudyApi.middleware,
  ChallengeApi.middleware,
  FakeUserApi.middleware,
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
    recordPage: recordPageReduer,
    FakeUserApi: FakeUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
