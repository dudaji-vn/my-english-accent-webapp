export interface RecordTypeResponse {
  recordId: string;
  clubStudyId: string;
  rCreated: string;
  rUpdated: string;
  userId: string;
  vocabularyId: string;
  rVoiceSrc: string;
}

export interface RecordRequest {
  userId: string;
  voiceSrc: string;
  vocabularyId: string;
  clubStudyId: string | null;
}

export interface RecordModal {
  club_study_id: string;
  vocabulary_id: string;
  user_id: string;
  voice_src: string;
  created: string;
  updated: string;
}
