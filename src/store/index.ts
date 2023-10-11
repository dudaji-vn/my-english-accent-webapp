import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "@/store/UserStore";
import exerciseReduer from "@/store/ExerciseStore";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { RecordApi, TopicApi, VocabularyApi } from "@/core/services";

const middleware = [
  TopicApi.middleware,
  RecordApi.middleware,
  VocabularyApi.middleware,
] as any;

export const store = configureStore({
  reducer: {
    user: userReducer,
    exercise: exerciseReduer,
    TopicApi: TopicApi.reducer,
    RecordApi: RecordApi.reducer,
    VocabularyApi: VocabularyApi.reducer,
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
