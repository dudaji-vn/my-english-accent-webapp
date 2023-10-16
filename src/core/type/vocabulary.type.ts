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
  phonetic_display_language: string;
  lecture_id: string;
  level: 0;
}

export interface INativeVocabularyRequest {
  vocabulary_id: string;
  title_native_language: string;
  language: string;
}
