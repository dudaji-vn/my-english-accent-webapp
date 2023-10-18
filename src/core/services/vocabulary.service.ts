import VocabularyController from "@/core/controllers/vocabulary.controller";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import Reducer from "@/shared/const/store.const";
import { VocabularyGroupByLecture } from "../type";

export const VocabularyApi = createApi({
  reducerPath: Reducer.vocabularyApi,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RecordPage"],
  endpoints: (builder) => ({
    getAllVocabulary: builder.query<VocabularyGroupByLecture[], void>({
      async queryFn() {
        try {
          const vocabularyData = await VocabularyController.getVocabularies();
          const groupVocabularyByLectureId = _(vocabularyData)
            .groupBy("lectureId.id")
            .map((val, key) => ({
              lectureId: key,
              vocabularies: val,
            }))
            .value();
          return {
            data: groupVocabularyByLectureId,
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAllVocabularyQuery } = VocabularyApi;

export default VocabularyApi;
