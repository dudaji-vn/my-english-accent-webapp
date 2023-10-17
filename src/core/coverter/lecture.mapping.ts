import { LectureModal, LectureResponseType } from "../type";

export const lectureConvert = (id: string, lecture: LectureModal): LectureResponseType => {
  return {
    lectureId: id,
    imgSrc: lecture.img_src,
    lectureName: lecture.lecture_name,
    created: lecture.created,
    updated: lecture.updated,
  };
};
