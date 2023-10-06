import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "@/store/userStore";
import exerciseReduer from "@/store/ExerciseStore";

export const store = configureStore({
  reducer: {
    user: userReducer,
    exercise: exerciseReduer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
