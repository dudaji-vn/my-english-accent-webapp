import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import LectureController from "@/core/controllers/lecture.controller";
import Reducer from "@/shared/const/store.const";
import { TopicType } from "@/shared/type";

// TODO: remove this file
export const LectureApi = createApi({
  reducerPath: Reducer.lectureApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTopicType: builder.query<TopicType[], void>({
      async queryFn() {
        try {
          const topics: any = await LectureController.getTopics();
          //default topicId
          return { data: topics };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTopicTypeQuery } = LectureApi;

export default LectureApi;
