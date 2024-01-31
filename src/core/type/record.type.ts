export const EMPTY_TRANSCRIPT = "EMPTY_TRANSCRIPT";

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
  finalTranscript?: string;
  challengeId?: string;
  score?: number;
}

export interface RecordModal {
  challenge_id?: string;
  vocabulary_id: string;
  user_id: string;
  voice_src: string;
  created: string;
  updated: string;
}

export interface IAddOrUpdateGoogleTranscript {
  recordId: string;
  transcripts: {
    transcript: string;
    confidence: number;
  }[];
  finalTranscript: string;
}
