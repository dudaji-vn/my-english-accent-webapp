import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";

import { LectureResponseType, EnrollmentResponseType, VocabularyTypeResponse } from "@/core/type";
import EnrollmentController from "@/core/controllers/enrollment.controller";
import Reducer from "@/shared/const/store.const";
import VocabularyController from "../controllers/vocabulary.controller";

export const InitializeApi = createApi({
  reducerPath: Reducer.initializeApi,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Initialize"],
  endpoints: (builder) => ({
    getInitialData: builder.query<_.Dictionary<(LectureResponseType & EnrollmentResponseType)[]>, string>({
      async queryFn(userId: string) {
        try {
          const enrollData = await EnrollmentController.getEnrollmentByUser("DRzkoxv6bLW6FP7aVrZh");
          const lecturesId = enrollData.map((enroll) => enroll.lectureId);

          const lectureData: LectureResponseType[] = [];
          await EnrollmentController.getEnrollmentByLectures(lecturesId).then((val) => lectureData.push(...val.flat()));

          const merged = _.mergeWith(lectureData, enrollData, (lecture: LectureResponseType, enroll: EnrollmentResponseType) => {
            if (lecture.lectureId === enroll.lectureId.id) {
              return {
                lectureId: lecture.lectureId,
                lectureName: lecture.lectureName,
                imgSrc: lecture.imgSrc,
                stage: enroll.stage,
                currentStep: enroll.currentStep,
                userId: enroll.userId,
                enrollmentId: enroll.enrollmentId,
              };
            }
          });

          const groupBy = _.groupBy(merged, "stage");

          return { data: groupBy };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
export const { useGetInitialDataQuery } = InitializeApi;
export default InitializeApi;
