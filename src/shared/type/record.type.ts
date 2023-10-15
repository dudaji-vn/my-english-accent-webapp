export interface RecordType {
  recordId: string;
  clubStudyId: string;
  vocabularyId: string;
  userId: string;
  voiceSrc: string;
  created: string;
  updated: string;
}

export interface RecordTypeResponse {
  recordId: string;
  clubStudyId: string;
  recordCreated: string;
  recordUpdated: string;
  userId: string;
  vocabularyId: string;
  recordVoiceSrc: string;
}
