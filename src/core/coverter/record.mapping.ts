import { RecordModal, RecordTypeResponse } from "../type";

export const recordConvert = (id: string, record: RecordModal): RecordTypeResponse => {
  return {
    clubStudyId: record.club_study_id,
    rCreated: record.created,
    recordId: id,
    rVoiceSrc: record.voice_src,
    rUpdated: record.updated,
    userId: record.user_id,
    vocabularyId: record.vocabulary_id,
  };
};
