import { TopicUIType, VocabularyType } from "../type";

const VOCABULARY = "vocabulary";
const TOKEN = "token";

const persist = {
  saveVocabulary: (
    value: Omit<TopicUIType, "imgSrc" | "vocabularies"> &
      Partial<VocabularyType>
  ) => {
    localStorage.setItem(VOCABULARY, JSON.stringify(value));
  },
  getVocabulary: () => {
    const vocabu = localStorage.getItem(VOCABULARY);
    return vocabu ? JSON.parse(vocabu) : null;
  },
  login: (token: string) => {
    localStorage.setItem(TOKEN, token);
  },
  getToken: () => {
    return localStorage.getItem(TOKEN);
  },
};

export default persist;
