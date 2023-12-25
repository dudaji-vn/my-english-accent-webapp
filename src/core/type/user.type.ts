export type Language = "vn" | "us" | "kr";

type NationalType = {
  [T in Language]: string;
};

export const NATIONAL: NationalType = {
  vn: "Việt Nam",
  kr: "한국인",
  us: "English (US)",
};

export interface  UserResponseType {
  userId: string;
  nativeLanguage: Language;
  userName: string;
  nickName: string;
  avatarUrl: string;
  favoriteUserIds: string[];
  favoriteLectureIds: string[];
  googleId: string;
  displayLanguage: Language;
  email: string;
  created: Date;
  updated: Date;
}

export interface IUSerRegister {
  nickName: string;
  nativeLanguage: Language;
  displayLanguage: Language;
  googleId: string;
  email: string;
}

export interface IUserLogin {
  email: string;
  googleId: string;
}

export interface UserModal {
  user_name: string;
  nick_name: string;
  display_language: Language;
  native_language: Language;
  avatar_url: string;
  google_id: string;
  favorite_user_ids: string[];
  updated: string;
  created: string;
}

export interface IIsUserWinEvent {
  status: string;
  message: string;
}