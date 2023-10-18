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

export interface IExerciseFilterType extends Omit<VocabularyType, "idVocabulary">, IExerciseType {
  idVocabulary: string[];
}
export interface IExerciseType {
  store: TopicUIType[];
  filter: Omit<TopicUIType, "imgSrc" | "vocabularies">;
  vocabularies: VocabularyType[];
  vocabularyIndex: number;
}

const vocabulary = [
  {
    vocabulary_id: "voca_id1",
    title_display_language: "Hello",
    phonetic_display_language: "Hello",
    lecture_id: "",
    level: "Fresher",
  },
  {
    vocabulary_id: "voca_id2",
    title_display_language: "Hi",
    phonetic_display_language: "Hi",
    lecture_id: "",
    level: "Immediately",
  },
];
