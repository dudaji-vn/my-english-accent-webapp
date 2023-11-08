import VocabularyController from "@/core/controllers/vocabulary.controller";
import { createApi } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import Reducer from "@/shared/const/store.const";
import { EnrollmentRequest, VocabularyGroupByLecture, VocabularyRequest } from "../type";
import baseQuery from "..";
import UserController from "../controllers/user.controller";

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
      providesTags: (result, error, arg) => (arg ? [{ type: "Vocabulary" as const, lectureId: arg.lectureId }, "Vocabulary"] : ["Vocabulary"]),
    }),
    enrollLecture: builder.mutation<boolean, EnrollmentRequest>({
      query: (payload) => UserController.addOrUpdateEnrollment(payload),
      invalidatesTags: (result, error, arg) => (arg ? [{ type: "Vocabulary" as const, lectureId: arg.lectureId }, "Vocabulary"] : ["Vocabulary"]),
    }),
  }),
});

export const { useGetAllVocabulariesInLectureQuery, useEnrollLectureMutation } = VocabularyApi;

export default VocabularyApi;
