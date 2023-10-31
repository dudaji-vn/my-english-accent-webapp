import { UserResponseType } from "@/core/type";

const TOKEN = "token";
const USER_INFO = "userInfo";
const GOOGLE_ID = "googleId";

const persist = {
  saveMyInfo: (myInfo: UserResponseType) => {
    localStorage.setItem(TOKEN, myInfo.userId);
    localStorage.setItem(USER_INFO, JSON.stringify(myInfo));
  },
  getMyInfo: (): UserResponseType => {
    const myInfo = localStorage.getItem(USER_INFO);
    return myInfo ? JSON.parse(myInfo) : null;
  },
  logout: () => {
    localStorage.removeItem(USER_INFO);
    localStorage.removeItem(TOKEN);
  },
  getToken: () => {
    return localStorage.getItem(TOKEN) ?? "";
  },
  saveToken: (token: string) => {
    localStorage.setItem(TOKEN, token);
  },
  getGoogleId: () => {
    return localStorage.getItem(GOOGLE_ID) ?? "";
  },
  saveGoogleId: (id: string) => {
    localStorage.setItem(GOOGLE_ID, id);
  },
};

export default persist;
