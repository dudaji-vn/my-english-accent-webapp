import { VocabularyType } from "./vocabulary.type";

export enum StageExercise {
  Open = 0,
  Inprogress = 1,
  Close = 2,
}

export const StageLabel: Record<StageExercise, string> = {
  [StageExercise.Inprogress]: "In progress",
  [StageExercise.Open]: "Explore",
  [StageExercise.Close]: "Finish",
};

export interface TopicType {
  topicId: string;
  imgSrc: string;
  name: string;
  created: string;
  updated: string;
  vocabularies: VocabularyType[];
}

export interface TopicUIType {
  topicId: string;
  name: string;
  imgSrc: string;
  stage: StageExercise;
  totalPhrase: number;
  currentPhrase: number;
  vocabularies: VocabularyType[];
}
