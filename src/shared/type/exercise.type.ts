import { StageExercise, TopicUIType } from "./topic.type";
import { VocabularyType } from "./vocabulary.type";

export interface UserType {
  idUser: string;
  userName: string;
  password: string;
  displayLanguage: string;
  nativeLanguage: string;
}

export interface VocabularyType2 {
  idVocabulary: string;
  titlePrimaryLanguage: string;
  titleSecondaryLanguage: string;
  ipa: string;
  voiceSrc: string;
}

export interface TopicType2 {
  topicId: string;
  topicName: string;
  imgSrc: string;
  stage: StageExercise;
  totalPhrase: number;
  currentPhrase: number;
}

export interface IExerciseFilterType
  extends Omit<VocabularyType, "idVocabulary">,
    TopicUIType {
  idVocabulary: string[];
}
export interface IExerciseType {
  store: TopicType2[];
  filter: Omit<TopicUIType, "imgSrc">;
  vocabularies: any[];
  vocabularyIndex: number;
}
