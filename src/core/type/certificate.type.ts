export interface IGetContentById {
  strategyType: "vocabulary";
  certificateId: string;
}
export interface ICertificate {
  id: string;
  name: string;
  type: number;
  star: number;
  totalScore: number;
}
export interface IVocabularyContent {
  vocabularyId: string;
  order: number;
  phonetic: string;
  textTranslate: string;
  title: string;
  voiceSrc?: string;
  result?: string;
}
export interface ISubmitExam {
  slug: string;
  certificateId: string;
  score: number;
  start: number;
  records: {
    voiceSrc: string;
    vocabularyId: string;
    result: string;
  }[];
}
export interface ICertificateContent extends ICertificate {
  contents: IVocabularyContent[];
}
