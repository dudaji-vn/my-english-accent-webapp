import { ClubVocabularyModal, ClubVocabularyTypeResponse, NativeVocabularyModal, NativeVocabularyTypeResponse, VocabularyModal, VocabularyTypeResponse } from "../type";

export const vocbularyConvert = (id: string, vocabulary: VocabularyModal): VocabularyTypeResponse => {
  return {
    lectureId: "",
    vCreated: vocabulary.created,
    vphoneticDisplayLanguage: vocabulary.phonetic_display_language,
    vtitleDisplayLanguage: vocabulary.title_display_language,
    vUpdated: vocabulary.updated,
    vocabularyId: id,
  };
};

export const nativeVocbularyConvert = (id: string, vocabulary: NativeVocabularyModal): NativeVocabularyTypeResponse => {
  return {
    nativeVocabulary: id,
    vocabularyId: vocabulary.vocabulary_id,
    titleNativeLanguage: vocabulary.title_native_language,
    language: vocabulary.language,
    updated: vocabulary.updated,
    created: vocabulary.created,
  };
};

export const clubVocbularyConvert = (id: string, vocabulary: ClubVocabularyModal): ClubVocabularyTypeResponse => {
  return {
    challengeId: vocabulary.challenge_id,
    vocabularyId: vocabulary.vocabulary_id,
    updated: vocabulary.updated,
    created: vocabulary.created,
    number: vocabulary.number,
    clubVocabularyId: id,
  };
};
