import { VocabularyType } from "./vocabulary.type";

export enum StageExercise {
  Inprogress = 0,
  Open = 1,
  Close = 2,
}

export const StageLabel: Record<StageExercise, string> = {
  "0": "In progress",
  "1": "Explore",
  "2": "Archived",
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
