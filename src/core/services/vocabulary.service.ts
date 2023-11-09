import VocabularyController from "@/core/controllers/vocabulary.controller";
import { createApi } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import Reducer from "@/shared/const/store.const";
import { EnrollmentRequest, EnrollmentStep, VocabularyGroupByLecture, VocabularyRequest } from "../type";
import baseQuery from "..";
import UserController from "../controllers/user.controller";

export const VocabularyApi = createApi({
  reducerPath: Reducer.vocabularyApi,
  baseQuery: baseQuery,
  tagTypes: ["Vocabulary"],
  endpoints: (builder) => ({
    getAllVocabulariesInLecture: builder.query<VocabularyGroupByLecture, string>({
      query: (lectureId) => VocabularyController.getAllVocabulariesInLecture(lectureId),
      transformResponse: (response: { data: VocabularyGroupByLecture }) => {
        return response.data;
      },
      forceRefetch: (params) => {
        return params.currentArg == params.previousArg;
      },
    }),
    enrollLecture: builder.mutation<EnrollmentStep, EnrollmentRequest>({
      query: (payload) => UserController.addOrUpdateEnrollment(payload),
      transformResponse: (response: { data: EnrollmentStep }) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetAllVocabulariesInLectureQuery, useEnrollLectureMutation } = VocabularyApi;

export default VocabularyApi;
