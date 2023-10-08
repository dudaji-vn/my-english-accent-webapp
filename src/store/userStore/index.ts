import Store from "@/shared/const/store.const";
import { ILogin } from "@/shared/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  token: string;
  national: "kr" | "vi";
}

const initialState: UserType = {
  token: "",
  national: "kr",
};

const userSlice = createSlice({
  name: Store.user,
  initialState,
  reducers: {
    login: (state: UserType, action: PayloadAction<ILogin>) => {
      const { user, password } = action.payload;
      state.token = user + password;
      console.log("store::login::", state.token);
    },
    logout: (state: UserType) => {
      state.token = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
