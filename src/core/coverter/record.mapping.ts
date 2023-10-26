import { RecordModal, RecordTypeResponse } from "../type";

export const recordConvert = (id: string, record: RecordModal): RecordTypeResponse => {
  return {
    challengeId: record.challenge_id,
    rCreated: record.created,
    recordId: id,
    rVoiceSrc: record.voice_src,
    rUpdated: record.updated,
    userId: record.user_id,
    vocabularyId: record.vocabulary_id,
  };
};
