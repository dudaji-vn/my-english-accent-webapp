import { createApi } from "@reduxjs/toolkit/query/react";
import LectureController from "@/core/controllers/lecture.controller";
import Reducer from "@/shared/const/store.const";
import { EnrollmentResponseType, LectureResponseType } from "../type";
import baseQuery from "..";
import { StageExercise } from "@/shared/type";
import UserController from "../controllers/user.controller";

export const LectureApi = createApi({
  reducerPath: Reducer.lectureApi,
  baseQuery: baseQuery,
  tagTypes: ["Lecture"],
  endpoints: (builder) => ({
    getLectures: builder.query<LectureResponseType[], void>({
      query: LectureController.getLectures,
      transformResponse: (response: { data: LectureResponseType[] }) => response.data,
      providesTags: ["Lecture"],
    }),
    getLecturesBy: builder.query<(LectureResponseType & EnrollmentResponseType)[], StageExercise>({
      query: (stage) => UserController.getLecturesBy(stage),
      transformResponse: (response: { data: (LectureResponseType & EnrollmentResponseType)[] }) => response.data,
      forceRefetch: (params) => {
        return params.currentArg == params.previousArg;
      },
      providesTags: (result, error, arg) => (arg ? [{ type: "Lecture" as const, stage: arg }, "Lecture"] : ["Lecture"]),
    }),
  }),
});

export const { useGetLecturesQuery, useGetLecturesByQuery } = LectureApi;

export default LectureApi;
