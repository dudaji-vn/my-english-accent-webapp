import { VocabularyResponseType } from "../services";
import { VocabularyModal, VocabularyTypeResponse } from "../type";

export const vocbularyConvert = (id: string, vocabulary: VocabularyModal): VocabularyTypeResponse => {
  return {
    lectureId: vocabulary.lecture_id,
    vCreated: vocabulary.created,
    vphoneticDisplayLanguage: vocabulary.phonetic_display_language,
    vtitleDisplayLanguage: vocabulary.title_display_language,
    vtitleNativeLanguage: vocabulary.title_display_language,
    vUpdated: vocabulary.updated,
    vocabularyId: id,
  };
};
