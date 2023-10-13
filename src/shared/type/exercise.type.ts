import { TopicUIType } from "./topic.type";
import { VocabularyType } from "./vocabulary.type";

export interface UserType {
  userId: string;
  userName: string;
  password: string;
  displayLanguage: string;
  nativeLanguage: string;
  favoriteUserIds: string[];
}

export interface IExerciseFilterType
  extends Omit<VocabularyType, "idVocabulary">,
    TopicUIType {
  idVocabulary: string[];
}
export interface IExerciseType {
  store: TopicUIType[];
  filter: Omit<TopicUIType, "imgSrc" | "vocabularies">;
  vocabularies: VocabularyType[];
  vocabularyIndex: number;
}
