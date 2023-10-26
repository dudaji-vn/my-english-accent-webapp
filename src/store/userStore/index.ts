import { UserApi } from "@/core/services";
import Reducer from "@/shared/const/store.const";
import persist from "@/shared/utils/persist.util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  token: string;
  myInfo: any;
}

const initialState: UserType = {
  token: "",
  myInfo: {
    name: "Thien",
    nickName: "Thien dev",
    displayLanguage: "en",
    nativeLanguage: "vi",
  },
};

const userSlice = createSlice({
  name: Reducer.user,
  initialState,
  reducers: {
    saveToken: (state: UserType, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state: UserType) => {
      state.token = "";
      console.log("LOGOUT::");
    },
  },
});

export const { saveToken, logout } = userSlice.actions;

export default userSlice.reducer;
