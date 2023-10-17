import { DocumentReference } from "firebase/firestore";
import { Language, Level } from "./user.type";

export interface VocabularyTypeResponse {
  vCreated: string;
  vphoneticDisplayLanguage: string;
  vtitleDisplayLanguage: string;
  vtitleNativeLanguage: string;
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
  titleVativeLanguage: Language;
  language: Level;
  updated: string;
  created: string;
}
export interface NativeVocabularyModal {
  vocabulary_id: DocumentReference;
  title_native_language: string;
  language: Level;
  updated: string;
  created: string;
}

export interface VocabularyGroupByLecture {
  lectureId: string;
  vocabularies: VocabularyTypeResponse[];
}
