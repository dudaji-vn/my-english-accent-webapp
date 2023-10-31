import { RecordTypeResponse } from "./record.type";
import { EClass } from "./user.type";
import { VocabularyTypeResponse } from "./vocabulary.type";

export interface LectureResponseType {
  lectureId: string;
  imgSrc: string;
  lectureName: string;
  created: string;
  updated: string;
}

export interface LectureModal {
  lecture_name: string;
  img_src: string;
  class: EClass;
  updated: string;
  created: string;
}

export interface ILectureDisplay extends LectureResponseType {
  vocabularies: VocabularyTypeResponse[] & RecordTypeResponse[];
}
