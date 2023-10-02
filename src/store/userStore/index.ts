import Store from "@/shared/const/store.const";
import { ILogin } from "@/shared/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  token: string;
}

const initialState: Type = {
  token: "",
};

const userSlice = createSlice({
  name: Store.user,
  initialState,
  reducers: {
    login: (state: Type, action: PayloadAction<ILogin>) => {
      const { user, password } = action.payload;
      state.token = user + password;
      console.log("store::login::", state.token);
    },
    logout: (state: Type) => {
      state.token = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
