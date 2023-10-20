import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import LectureController from "@/core/controllers/lecture.controller";
import Reducer from "@/shared/const/store.const";
import { LectureResponseType } from "../type";

export const LectureApi = createApi({
  reducerPath: Reducer.lectureApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getLectures: builder.query<LectureResponseType[], void>({
      async queryFn() {
        try {
          const lectures = await LectureController.getLectures();
          console.log(lectures);
          return { data: lectures };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetLecturesQuery } = LectureApi;

export default LectureApi;
