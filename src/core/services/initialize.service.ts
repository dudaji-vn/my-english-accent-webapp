import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import Reducer from "@/shared/const/store.const";
import { LectureResponseType } from "../type";
import EnrollmentController from "../controllers/enrollment.controller";
import _ from "lodash";

export const InitializeApi = createApi({
  reducerPath: Reducer.initializeApi,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Initialize"],
  endpoints: (builder) => ({
    getInitialData: builder.query<any[], string>({
      async queryFn(userId: string) {
        try {
          const enrollData = await EnrollmentController.getEnrollmentByUser("DRzkoxv6bLW6FP7aVrZh");
          const lecturesId = enrollData.map((enroll) => enroll.lectureId);

          const lectureData: LectureResponseType[] = [];
          await EnrollmentController.getEnrollmentByLectures(lecturesId).then((val) => lectureData.push(...val.flat()));

          const merged = _.merge(lectureData, enrollData);

          const groupBy = _.groupBy(merged, "stage");

          console.info(groupBy);

          return { data: groupBy as any };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
export const { useGetInitialDataQuery } = InitializeApi;
export default InitializeApi;
