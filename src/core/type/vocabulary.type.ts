import { DocumentReference, Timestamp } from "firebase/firestore";
import { Language } from "./user.type";
import { EnrollmentResponseType } from "./enrollment.type";
import { SentenceStatus, StageExercise } from "@/shared/type";

export interface VocabularyTypeResponse {
  vCreated: string;
  vphoneticDisplayLanguage: string;
  vtitleDisplayLanguage: string;
  lectureId: string;
  vUpdated: string;
  vocabularyId: string;
}

export interface VocabularyModal {
  title_display_language: string;
  phonetic_display_language: string;
  lecture_id: DocumentReference;
  updated: string;
  created: string;
}

export interface NativeVocabularyTypeResponse {
  vocabularyId: string;
  titleNativeLanguage: string;
  language: Language;
  updated: string;
  created: string;
  nativeVocabulary: string;
}
export interface NativeVocabularyModal {
  vocabulary_id: string;
  title_native_language: string;
  language: Language;
  updated: string;
  created: string;
}

export interface VocabularyGroupByLecture {
  lectureId: string;
  currentStep: number;
  stage: StageExercise;
  enrollmentId: string;
  vocabularies: VocabularyTypeWithNativeLanguageResponse[];
  lectureName: string;
  lectureImgUrl: string;
}

export interface VocabularyMergedEnrollMent extends EnrollmentResponseType {
  vocabularies: VocabularyTypeResponse[] & NativeVocabularyTypeResponse[] & EnrollmentResponseType[];
}

export interface ClubVocabularyTypeResponse {
  challengeId: DocumentReference;
  vocabularyId: DocumentReference;
  updated: Timestamp;
  created: Timestamp;
  number: number;
  clubVocabularyId: string;
}
export interface ClubVocabularyModal {
  challenge_id: DocumentReference;
  vocabulary_id: DocumentReference;
  updated: Timestamp;
  created: Timestamp;
  number: number;
}

export interface VocabularyRequest {
  lectureId: string;
  stage: number;
}

export interface VocabularyTypeWithNativeLanguageResponse extends NativeVocabularyTypeResponse, VocabularyTypeResponse {
  voiceSrc: string;
  enrollmentId: string;
  finalTranscript: string;
  status?: SentenceStatus;
}
