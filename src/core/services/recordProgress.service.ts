import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";

import { EnrollmentResponseType, LectureResponseType, NativeVocabularyTypeResponse, RecordRequest, VocabularyMergedEnrollMent, VocabularyTypeResponse } from "@/core/type";
import Reducer from "@/shared/const/store.const";
import VocabularyController from "../controllers/vocabulary.controller";
import EnrollmentController from "../controllers/enrollment.controller";
import RecordController from "../controllers/record.controller";

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
            vocabularies: _.values(merged),
          } as any;
          console.info("getAllVocabulariesByLecture", result);
          return { data: result };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["RecordProgress"],
    }),

    addRecord: builder.mutation<boolean, RecordRequest>({
      async queryFn(payload: RecordRequest) {
        try {
          await RecordController.addRecord(payload);
          return { data: true };
        } catch (error) {
          console.error("RecordProgress::addRecord::", error);
          return { error };
        }
      },
      invalidatesTags: ["RecordProgress"],
    }),

    updateEnrollmentStep: builder.mutation<
      boolean,
      {
        enrollmentId: string;
        currentStep: number;
        totalStep: number;
      }
    >({
      async queryFn(payload: { enrollmentId: string; currentStep: number; totalStep: number }) {
        try {
          const { currentStep, totalStep, enrollmentId } = payload;

          const nextStep = currentStep + 1;

          const request = {
            enrollmentId,
            current_step: nextStep >= totalStep ? totalStep : nextStep,
            stage: nextStep >= totalStep ? "Close" : "Inprogress",
          };

          await EnrollmentController.updateEnrollment(request);
          return { data: true };
        } catch (error) {
          console.error("RecordProgress::updateEnrollmentStep::", error);
          return { error };
        }
      },
      invalidatesTags: ["RecordProgress"],
    }),

    getAllRecordsOfVocabulary: builder.query<any, string>({
      async queryFn(userId: string) {
        try {
          const records = await RecordController.getUserRecords(userId);
          return { data: records };
        } catch (error) {
          console.error("RecordProgress::getAllRecordsOfVocabulary::", error);
          return { error };
        }
      },
      providesTags: ["RecordProgress"],
    }),
  }),
});
export const { useGetAllVocabulariesByLectureQuery, useAddRecordMutation, useUpdateEnrollmentStepMutation } = RecordProgress;
export default RecordProgress;
