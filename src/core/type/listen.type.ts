import { IRecordOfUser } from "./challenge.type";
import { LectureResponseType } from "./lecture.type";
import { Language } from "./user.type";
import { VocabularyTypeResponse } from "./vocabulary.type";

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

export interface PlaylistLecture {
  totalLecture: number;
  totalPeople: number;
  lectures: LectureResponseType[];
}

export interface PlaylistDetailLecture {
  lecture: LectureResponseType;
  vocabularies: VocabularyTypeResponse[];
  participants: IRecordOfUser[];
}
