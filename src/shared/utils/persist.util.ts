import { IUserLogin, UserResponseType } from "@/core/type";

const TOKEN = "token";
const USER_INFO = "userInfo";
const GOOGLE_ID = "googleId";

const persist = {
  saveMyInfo: (myInfo: UserResponseType) => {
    localStorage.setItem(USER_INFO, JSON.stringify(myInfo));
  },
  getMyInfo: (): UserResponseType => {
    const myInfo = localStorage.getItem(USER_INFO);
    return myInfo ? JSON.parse(myInfo) : null;
  },
  getToken: () => {
    return localStorage.getItem(TOKEN) ?? "";
  },
  saveToken: (token: string) => {
    localStorage.setItem(TOKEN, token);
  },
  getProviderInfo: () => {
    const provider = localStorage.getItem(GOOGLE_ID);
    return provider ? JSON.parse(provider) : null;
  },
  saveProviderInfo: (payload: IUserLogin) => {
    localStorage.setItem(GOOGLE_ID, JSON.stringify(payload));
  },
  logout: () => {
    localStorage.removeItem(USER_INFO);
    localStorage.removeItem(GOOGLE_ID);
    localStorage.removeItem(TOKEN);
  },
};

export default persist;
