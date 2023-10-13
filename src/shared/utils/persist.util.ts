import { TopicUIType, UserType, VocabularyType } from "../type";

const VOCABULARY = "vocabulary";
const TOKEN = "token";
const USER_INFO = "userInfo";

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
  saveMyInfo: (myInfo: UserType) => {
    localStorage.setItem(TOKEN, myInfo.userId);
    localStorage.setItem(USER_INFO, JSON.stringify(myInfo));
  },
  getMyInfo: (): UserType => {
    const myInfo = localStorage.getItem(USER_INFO);
    return myInfo ? JSON.parse(myInfo) : null;
  },
  getToken: () => {
    return localStorage.getItem(TOKEN);
  },
};

export default persist;
