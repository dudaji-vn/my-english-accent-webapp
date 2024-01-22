export type TNameCertificateStrategy = "vocabulary";
export interface IGetContentById {
  strategyType: TNameCertificateStrategy;
  certificateId: string;
}
export interface ICertificate {
  id: string;
  name: string;
  type: number;
  star: number;
  score: number;
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

export interface IUserCertificateRequest {
  strategyType: TNameCertificateStrategy;
  certificateId: string;
  records: {
    vocabularyId: string;
    voiceSrc: string;
    result: string;
  }[];
  score: number;
  star: number;
  correctSentences: number;
}

export interface IUserCertificate {
  nickName: string;
  userId: string;
  score: number;
  totalScore: number;
  certificateName: string;
  certificateId: string;
  archivedDate: string;
  slug: string;
  star: number;
}

export interface IUserRecordCertificate {
  nickName: string;
  score: number;
  totalScore: number;
  certificateName: string;
  archivedDate: string;
  star: number;
  records: {
    recordId: string;
    voiceSrc: string;
    result: string;
    title: string;
    phonetic: string;
  }[];
}

export interface IGetUserCertificateQuery {
  slug: string;
}
