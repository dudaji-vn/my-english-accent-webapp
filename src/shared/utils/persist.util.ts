import { TopicUIType, VocabularyType } from "../type";

const VOCABULARY = "vocabulary";
const TOKEN = "token";

const persist = {
  saveVocabulary: (value: Omit<TopicUIType, "imgSrc"> & VocabularyType) => {
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

export default persist;
