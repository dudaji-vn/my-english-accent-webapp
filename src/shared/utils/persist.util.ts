import { IExerciseFilterType } from "../type";

const VOCABULARY = "vocabulary";

export const persist = {
  saveVocabulary: (value: IExerciseFilterType) => {
    localStorage.setItem(VOCABULARY, JSON.stringify(value));
  },
  getVocabulary: () => {
    return localStorage.getItem(VOCABULARY);
  },
};
