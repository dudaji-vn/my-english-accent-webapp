import VocabularyController from "@/core/controllers/vocabulary.controller";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import Reducer from "@/shared/const/store.const";
import { VocabularyGroupByLecture, VocabularyRequest } from "../type";
import baseQuery from "..";

export const VocabularyApi = createApi({
  reducerPath: Reducer.vocabularyApi,
  baseQuery: baseQuery,
  tagTypes: ["Vocabulary"],
  endpoints: (builder) => ({
    getAllVocabulariesInLecture: builder.query<VocabularyGroupByLecture, VocabularyRequest>({
      query: (payload) => VocabularyController.getAllVocabulariesInLecture(payload),
      transformResponse: (response: { data: VocabularyGroupByLecture }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetAllVocabulariesInLectureQuery } = VocabularyApi;

export default VocabularyApi;
