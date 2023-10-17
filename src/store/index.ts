import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "@/store/UserStore";
import recordPageReduer from "@/store/RecordPageStore";
import listenPageReducer from "@/store/ListenPageStore";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { RecordApi, LectureApi, UserApi, VocabularyApi } from "@/core/services";
import InitializeApi from "@/core/services/initialize.service";

const middleware = [LectureApi.middleware, RecordApi.middleware, VocabularyApi.middleware, UserApi.middleware, InitializeApi.middleware] as any;

export const store = configureStore({
  reducer: {
    user: userReducer,
    recordPage: recordPageReduer,
    listenPage: listenPageReducer,
    LectureApi: LectureApi.reducer,
    RecordApi: RecordApi.reducer,
    VocabularyApi: VocabularyApi.reducer,
    UserApi: UserApi.reducer,
    InitializeApi: InitializeApi.reducer,
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
