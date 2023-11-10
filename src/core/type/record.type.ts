import { DocumentReference } from "firebase/firestore";

export interface RecordTypeResponse {
  recordId: string;
  challengeId?: string;
  rCreated: string;
  rUpdated: string;
  userId: string;
  vocabularyId: string;
  voiceSrc: string;
}

export interface RecordRequest {
  voiceSrc: string;
  vocabularyId: string;
  challengeId?: string;
}

export interface RecordModal {
  challenge_id?: string;
  vocabulary_id: string;
  user_id: string;
  voice_src: string;
  created: string;
  updated: string;
}
