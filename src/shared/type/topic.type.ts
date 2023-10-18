import { VocabularyType } from "./vocabulary.type";

export enum StageExercise {
  Inprogress = "Inprogress",
  Open = "Open",
  Close = "Close",
}

export const StageLabel: Record<StageExercise, string> = {
  "Inprogress": "In progress",
  "Open": "Explore",
  "Close": "Archived",
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
