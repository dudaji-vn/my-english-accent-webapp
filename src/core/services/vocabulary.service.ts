import VocabularyController from "@/core/controllers/vocabulary.controller";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { StageExercise, VocabularyType } from "@/shared/type";
import RecordController from "../controllers/record.controller";
import Reducer from "@/shared/const/store.const";
import LectureController from "../controllers/lecture.controller";
import { RecordRequest } from "../type";

export interface VocabularyResponseType {
  stage: StageExercise;
  totalPhrase: number;
  currentPhrase: number;
  vocabularies: VocabularyType[];
}

const calculateStage = (vocabularies: VocabularyType[]) => {
  const result = {};
  const filterIsRecord = vocabularies.filter((voca) => voca.isRecord);
  if (filterIsRecord.length === vocabularies.length) {
    Object.assign(result, {
      stage: StageExercise.Close,
      totalPhrase: filterIsRecord.length,
      currentPhrase: filterIsRecord.length,
    });
  } else if (filterIsRecord.length == 0) {
    Object.assign(result, {
      stage: StageExercise.Open,
      totalPhrase: vocabularies.length,
      currentPhrase: 0,
    });
  } else if (filterIsRecord.length < vocabularies.length) {
    Object.assign(result, {
      stage: StageExercise.Inprogress,
      totalPhrase: vocabularies.length,
      currentPhrase: filterIsRecord.length,
    });
  }
  return result;
};

export const VocabularyApi = createApi({
  reducerPath: Reducer.vocabularyApi,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RecordPage"],
  endpoints: (builder) => ({
    getVocabularies: builder.query<any[], string>({
      async queryFn(topicId: string) {
        try {
          const userId = "idUser2JLpns9SQblwSgNigfTwF";

          const vocabularies = await VocabularyController.getVocabularies(topicId);

          const records = await RecordController.getRecords(userId);

          const vocaPopulateRecord: VocabularyType[] = vocabularies.map((vocabulary: any) => {
            const findRecordMatch = records.find((record: any) => record.vocabularyId === vocabulary.vocabularyId);
            return !!findRecordMatch
              ? {
                  ...vocabulary,
                  isRecord: true,
                  voiceRecordSrc: findRecordMatch.rVoiceSrc,
                }
              : {
                  ...vocabulary,
                  isRecord: false,
                  voiceRecordSrc: "",
                };
          });

          const topic = await LectureController.getTopicById(topicId);
          const progress = calculateStage(vocaPopulateRecord);
          console.log("useGetVocabulariesQuery::", vocaPopulateRecord, progress);
          return {
            data: vocaPopulateRecord as any,
            meta: { ...progress, name: topic.lectureName, topicId: topic.lectureId },
          };
        } catch (error) {
          return { error };
        }
      },
      keepUnusedDataFor: 0,
      providesTags: ["RecordPage"],
    }),
    addRecord: builder.mutation<any, RecordRequest>({
      async queryFn(payload: RecordRequest) {
        try {
          await RecordController.addRecord(payload);
          return {
            data: "",
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["RecordPage"],
    }),
  }),
});

export const { useGetVocabulariesQuery, useAddRecordMutation } = VocabularyApi;

export default VocabularyApi;
