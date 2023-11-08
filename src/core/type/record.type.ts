import { DocumentReference } from "firebase/firestore";

export interface RecordTypeResponse {
  recordId: string;
  challengeId: DocumentReference | null;
  rCreated: string;
  rUpdated: string;
  userId: DocumentReference;
  vocabularyId: DocumentReference;
  rVoiceSrc: string;
}

export interface RecordRequest {
  voiceSrc: string;
  vocabularyId: string;
  challengeId?: string;
}

export interface RecordModal {
  challenge_id: DocumentReference | null;
  vocabulary_id: DocumentReference;
  user_id: DocumentReference;
  voice_src: string;
  created: string;
  updated: string;
}
