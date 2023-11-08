import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";

import Reducer from "@/shared/const/store.const";
import baseQuery from "..";
import RecordController from "../controllers/record.controller";
import { ILectureDisplay, RecordRequest } from "../type";

export const RecordApi = createApi({
  reducerPath: Reducer.recordApi,
  baseQuery: baseQuery,
  tagTypes: ["Record"],
  endpoints: (builder) => ({
    addOrUpdateRecord: builder.mutation<boolean, RecordRequest>({
      query: RecordController.addOrUpdateRecord,
      transformResponse: (response: { data: boolean }) => response.data,
    }),
    getMyRecordsByLecture: builder.query<ILectureDisplay, string>({
      query: (payload) => RecordController.getMyRecordsByLecture(payload),
      transformResponse: (response: { data: ILectureDisplay }) => response.data,
    }),
  }),
});
export const { useAddOrUpdateRecordMutation, useGetMyRecordsByLectureQuery } = RecordApi;
export default RecordApi;
