import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "@/store/UserStore";
import recordPageReduer from "@/store/RecordPageStore";
import listenPageReducer from "@/store/ListenPageStore";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { RecordApi, LectureApi, UserApi, VocabularyApi } from "@/core/services";
import InitializeApi from "@/core/services/initialize.service";
import RecordProgressApi from "@/core/services/recordProgress.service";
import ClubStudyApi from "@/core/services/club.service";

const middleware = [LectureApi.middleware, RecordApi.middleware, VocabularyApi.middleware, UserApi.middleware, InitializeApi.middleware, RecordProgressApi.middleware, ClubStudyApi.middleware] as any;

export const store = configureStore({
  reducer: {
    LectureApi: LectureApi.reducer,
    RecordApi: RecordApi.reducer,
    VocabularyApi: VocabularyApi.reducer,
    UserApi: UserApi.reducer,
    InitializeApi: InitializeApi.reducer,
    RecordProgressApi: RecordProgressApi.reducer,
    ClubStudyApi: ClubStudyApi.reducer,
    user: userReducer,
    recordPage: recordPageReduer,
    listenPage: listenPageReducer,
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
