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

export interface UserType {
  idUser: string;
  userName: string;
  password: string;
  displayLanguage: string;
  nativeLanguage: string;
}

export interface VocabularyType {
  idVocabulary: string;
  titlePrimaryLanguage: string;
  titleSecondaryLanguage: string;
  ipa: string;
  voiceSrc: string;
}

export interface ExerciseType {
  idExercise: string;
  exerciseName: string;
  imgSrc: string;
  stage: StageExercise;
  totalPhrase: number;
  currentPhrase: number;
}

export interface IExerciseFilterType
  extends Omit<VocabularyType, "idVocabulary">,
    ExerciseType {
  idVocabulary: string[];
}
export interface IExerciseType {
  store: ExerciseType[];
  filter: IExerciseFilterType;
  populatedVocabulary: any[];
}
