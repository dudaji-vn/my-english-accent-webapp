import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "@/store/UserStore";
import recordPageReduer from "@/store/RecordPageStore";
import listenPageReducer from "@/store/ListenPageStore";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { RecordApi, TopicApi, UserApi, VocabularyApi } from "@/core/services";

const middleware = [
  TopicApi.middleware,
  RecordApi.middleware,
  VocabularyApi.middleware,
  UserApi.middleware,
] as any;

export const store = configureStore({
  reducer: {
    user: userReducer,
    recordPage: recordPageReduer,
    listenPage: listenPageReducer,
    TopicApi: TopicApi.reducer,
    RecordApi: RecordApi.reducer,
    VocabularyApi: VocabularyApi.reducer,
    UserApi: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
