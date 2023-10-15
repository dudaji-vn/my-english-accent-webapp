import Store from "@/shared/const/store.const";
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
  name: Store.user,
  initialState,
  reducers: {
    saveToken: (state: UserType, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state: UserType) => {
      state.token = "";
    },
  },
});

export const { saveToken, logout } = userSlice.actions;

export default userSlice.reducer;
