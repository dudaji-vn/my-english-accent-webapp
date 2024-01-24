import { IUserLogin, IUserProfile, UserResponseType } from "@/core/type";

const TOKEN = "token";
const USER_INFO = "userInfo";
const GOOGLE_ID = "googleId";

const persist = {
  saveMyInfo: (myInfo: UserResponseType) => {
    localStorage.setItem(USER_INFO, JSON.stringify(myInfo));
  },
  updateProfile: (payload: IUserProfile) => {
    const myInfoJson = localStorage.getItem(USER_INFO);
    if (!myInfoJson) {
      return;
    }
    const myInfo = JSON.parse(myInfoJson) as UserResponseType;
    if (payload.avatarUrl) {
      myInfo.avatarUrl = payload.avatarUrl;
    }
    if (payload.nativeLanguege) {
      myInfo.nativeLanguage = payload.nativeLanguege;
    }
    if (payload.nickName) {
      myInfo.nickName = payload.nickName;
    }
    console.log({ myInfo, payload });
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
  saveProviderInfo: (payload: IUserLogin & { avatarUrl: string }) => {
    localStorage.setItem(GOOGLE_ID, JSON.stringify(payload));
  },
  logout: () => {
    localStorage.removeItem(USER_INFO);
    localStorage.removeItem(GOOGLE_ID);
    localStorage.removeItem(TOKEN);
  },
};

export default persist;
