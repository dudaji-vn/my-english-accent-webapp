export interface VocabularyTypeResponse {
  vocabularyCreated: string;
  vocabularyIpaDisplayLanguage: string;
  vocabularyTitleDisplayLanguage: string;
  vocabularytitleNativeLanguage: string;
  topicId: string;
  vocabularyUpdated: string;
  vocabularyId: string;
  vocabularyVoiceSrc: string;
}

export interface IVocabularyRequest {
  title_display_language: string;
  title_native_language: string;
  ipa_display_language: string;
  topic_id: string;
}
