import { ILectureDisplay, LectureResponseType } from "./lecture.type";

export type Language = "vn" | "kr";

type NationalType = {
  [T in Language]: string;
};

export const NATIONAL: NationalType = {
  vn: "Việt Nam",
  kr: "한국인",
};

export interface UserResponseType {
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
  googleToken: string;
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

export interface IUserProfile {
  nativeLanguage?: Language;
  avatarUrl?: string;
  nickName?: string;
}

export interface IUserRanking {
  userId: string;
  nickName: string;
  avatarUrl: string;
  totalScore: number;
  ranking: number;
  isMe: boolean;
  nativeLanguage: Language;
}

export interface IPlaylistUserRequest {
  lectureId: string;
  userId: string;
}

export interface IPlaylistUserSummaryResponse {
  userId: string;
  nickName: string;
  lectures: LectureResponseType[];
}

export interface IPlaylistUserResponse {
  likes: number;
  isLiked: boolean;
  records: {
    recordId: string;
    voiceSrc: string;
    title: string;
    phonetic: string;
  }[];
}
