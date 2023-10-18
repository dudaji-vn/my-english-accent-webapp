import { DocumentReference } from "firebase/firestore";

export interface RecordTypeResponse {
  recordId: string;
  clubStudyId: DocumentReference | null;
  rCreated: string;
  rUpdated: string;
  userId: DocumentReference;
  vocabularyId: DocumentReference;
  rVoiceSrc: string;
}

export interface RecordRequest {
  userId: string;
  voiceSrc: string;
  vocabularyId: string;
  clubStudyId: string | null;
  recordId?: string;
}

export interface RecordModal {
  club_study_id: DocumentReference | null;
  vocabulary_id: DocumentReference;
  user_id: DocumentReference;
  voice_src: string;
  created: string;
  updated: string;
}
