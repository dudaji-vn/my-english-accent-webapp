export interface TopicResponseType {
  vocabularyCreated: string;
  vocabularyIpaDisplayLanguage: string;
  vocabularyTitleDisplayLanguage: string;
  vocabularytitleNativeLanguage: string;
  topicId: string;
  vocabularyUpdated: string;
  vocabularyId: string;
  vocabularyVoiceSrc: string;
}
export interface ITopicRequest {
  name: string;
  img_src: string;
  level: number;
}

export interface ITopicResponse {
  created: string;
  img_src: string;
  level: number;
  lecture_name: string;
  updated: string;
}
