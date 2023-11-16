import { Language } from "./user.type";

export interface LectureListenTypeResponse {
  totalPeople: number;
  totalVocabularies: number;
  lectureId: string;
  lectureName: string;
  isSelected: boolean;
}

export interface PeopleistenTypeResponse {
  numberSelectedLectures: number;
  numberCompletedLectures: number;
  userId: string;
  avatarUrl: string;
  displayLanguage: Language;
  nativeLanguage: Language;
  nickName: string;
  isSelected: boolean;
}

export interface PlaylistRequest {
  favoriteUserIds: string[];
  favoriteLectureIds: string[];
}
