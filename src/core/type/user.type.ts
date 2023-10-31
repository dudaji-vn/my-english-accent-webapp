export type Language = "vi" | "en" | "kr";
export enum ELanguage {
  Vietnamese = "vi",
  English = "en",
  Korea = "kr",
}
export enum EClass {
  Developer,
  Designer,
  Other,
}

export interface UserResponseType {
  userId: string;
  nativeLanguage: ELanguage;
  userName: string;
  nickName: string;
  avatarUrl: string;
  class: EClass;
  favoriteUserIds: string[];
  googleId: string;
  displayLanguage: ELanguage;
  email: string;
  created: Date;
  updated: Date;
}

export interface IUSerRegister {
  nickName: string;
  nativeLanguage: ELanguage;
  displayLanguage: ELanguage;
  googleId: string;
  class: EClass[];
}

export interface IUserLogin {
  email: string;
  googleId: string;
}

export interface UserModal {
  user_name: string;
  nick_name: string;
  display_language: ELanguage;
  native_language: ELanguage;
  avatar_url: string;
  google_id: string;
  favorite_user_ids: string[];
  class: EClass;
  updated: string;
  created: string;
}
