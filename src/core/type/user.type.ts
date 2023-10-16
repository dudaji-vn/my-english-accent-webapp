export type Language = "vi" | "en" | "kr";

export interface UserResponseType {
  vocabularyCreated: string;
  vocabularyIpaDisplayLanguage: string;
  vocabularyTitleDisplayLanguage: string;
  vocabularytitleNativeLanguage: string;
  topicId: string;
  vocabularyUpdated: string;
  vocabularyId: string;
  vocabularyVoiceSrc: string;
}

export interface IUserAuth {
  user_name: string;
  password: string;
}

export interface IUserRegister extends IUserAuth {
  nick_name: string;
  display_language: Language;
  native_language: Language;
  avatar_url: string;
  google_id: string;
  favorite_user_ids: string[];
}
