import { DocumentReference } from "firebase/firestore";
import { Language, Level } from "./user.type";
import { EnrollmentResponseType } from "./enrollment.type";
import { StageExercise } from "@/shared/type";

export interface VocabularyTypeResponse {
  vCreated: string;
  vphoneticDisplayLanguage: string;
  vtitleDisplayLanguage: string;
  lectureId: DocumentReference;
  vUpdated: string;
  vocabularyId: string;
}

export interface VocabularyModal {
  title_display_language: string;
  phonetic_display_language: string;
  lecture_id: DocumentReference;
  level: Level;
  updated: string;
  created: string;
}

export interface NativeVocabularyTypeResponse {
  vocabularyId: DocumentReference;
  titleNativeLanguage: string;
  language: Language;
  updated: string;
  created: string;
  nativeVocabulary: string;
}
export interface NativeVocabularyModal {
  vocabulary_id: DocumentReference;
  title_native_language: string;
  language: Language;
  updated: string;
  created: string;
}

export interface VocabularyGroupByLecture {
  lectureId: string;
  vocabularies: VocabularyTypeResponse[];
}

export interface VocabularyMergedEnrollMent extends EnrollmentResponseType {
  vocabularies: VocabularyTypeResponse[] & NativeVocabularyTypeResponse[] & EnrollmentResponseType[];
}

export interface ClubVocabularyTypeResponse {
  challengeId: DocumentReference;
  vocabularyId: DocumentReference;
  updated: string;
  created: string;
  number: number;
  clubVocabularyId:string
}
export interface ClubVocabularyModal {
  challenge_id: DocumentReference;
  vocabulary_id: DocumentReference;
  updated: string;
  created: string;
  number: number;
}
