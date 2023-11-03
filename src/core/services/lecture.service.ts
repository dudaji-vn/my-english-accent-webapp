import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import LectureController from "@/core/controllers/lecture.controller";
import Reducer from "@/shared/const/store.const";
import { LectureResponseType } from "../type";
import baseQuery from "..";

export const LectureApi = createApi({
  reducerPath: Reducer.lectureApi,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getLectures: builder.query<LectureResponseType[], void>({
      query: LectureController.getLectures,
      transformResponse: (response: { data: LectureResponseType[] }) => response.data,
    }),
  }),
});

export const { useGetLecturesQuery } = LectureApi;

export default LectureApi;
