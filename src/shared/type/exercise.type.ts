export enum ExerciseStage {
  Open = 0,
  Inprogress = 1,
  Close = 2,
}

export interface ExerciseType {
  stage: ExerciseStage;
  imgSrc: string;
  title: string;
  currentPhrase: number;
  totalPhrase: number;
  phraseSecondaryLanguage: string;
  phrasePrimaryLanguage: string;
  ipa: string;
  id: any;
}
