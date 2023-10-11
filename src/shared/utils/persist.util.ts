import { IExerciseFilterType } from "../type";

const VOCABULARY = "vocabulary";
const TOKEN = "token";

export const persist = {
  saveVocabulary: (value: IExerciseFilterType) => {
    localStorage.setItem(VOCABULARY, JSON.stringify(value));
  },
  getVocabulary: () => {
    return localStorage.getItem(VOCABULARY);
  },
  login: (token: string) => {
    localStorage.setItem(TOKEN, token);
  },
  getToken: () => {
    return localStorage.getItem(TOKEN);
  },
};
