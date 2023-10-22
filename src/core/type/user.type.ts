export type Language = "vi" | "en" | "kr";
export type Level = "Beginer" | "Intermediate" | "Advanced";

export interface UserResponseType {
  userId: string;
  nativeLanguage: Language;
  userName: string;
  nickName: string;
  avatarUrl: string;
  level: Level;
  favoriteUserIds: string[];
  googleId: string;
  displayLanguage:Language
}

export interface IUserAuth {
  userName: string;
  password: string;
}

export interface UserModal {
  user_name: string;
  nick_name: string;
  display_language: Language;
  native_language: Language;
  avatar_url: string;
  google_id: string;
  favorite_user_ids: string[];
  level: Level;
  updated: string;
  created: string;
}
