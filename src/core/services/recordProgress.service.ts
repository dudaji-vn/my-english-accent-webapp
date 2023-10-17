import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";

import { EnrollmentResponseType, LectureResponseType, NativeVocabularyTypeResponse, VocabularyMergedEnrollMent, VocabularyTypeResponse } from "@/core/type";
import Reducer from "@/shared/const/store.const";
import VocabularyController from "../controllers/vocabulary.controller";
import EnrollmentController from "../controllers/enrollment.controller";

export const RecordProgress = createApi({
  reducerPath: Reducer.recordProgress,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RecordProgress"],
  endpoints: (builder) => ({
    getAllVocabulariesByLecture: builder.query<VocabularyMergedEnrollMent, string>({
      async queryFn(lectureId: string) {
        try {
          const vocabularies = await VocabularyController.getVocabularyByLecture(lectureId);
          const vocabulariesId = vocabularies.map((voca) => voca.vocabularyId);
          const nativeVocabulaies: NativeVocabularyTypeResponse[] = [];
          await VocabularyController.getNativeVocabulary(vocabulariesId).then((val) => nativeVocabulaies.push(...val.flat()));
          const mergeVocabulary = _.merge({}, vocabularies, nativeVocabulaies);

          const enrollData = await EnrollmentController.getEnrollmentByLecture(lectureId);

          const merged = _.mergeWith(mergeVocabulary, enrollData, (voca: VocabularyTypeResponse & NativeVocabularyTypeResponse, enroll: EnrollmentResponseType) => {
            if (voca.lectureId.id === enroll.lectureId.id) {
              return {
                lectureId: enroll.lectureId,
                vocabularyId: voca.vocabularyId,
                vphoneticDisplayLanguage: voca.vphoneticDisplayLanguage,
                vtitleDisplayLanguage: voca.vtitleDisplayLanguage,
                titleNativeLanguage: voca.titleNativeLanguage,
                language: voca.language,
              };
            }
          });

          const result = {
            stage: enrollData[0].stage,
            currentStep: enrollData[0].currentStep,
            enrollmentId: enrollData[0].enrollmentId,
            lectureId: enrollData[0].lectureId,
            userId: enrollData[0].userId,
            vocabularies: merged,
          } as VocabularyMergedEnrollMent;
          console.info(result);
          return { data: result };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
export const { useGetAllVocabulariesByLectureQuery } = RecordProgress;
export default RecordProgress;
