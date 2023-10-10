import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import TopicService from "../services/topic.service";

// Define a service using a base URL and expected endpoints
export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTopics: builder.query<any, string>({
      async queryFn() {
        try {
          let topics: any = [];
          TopicService.getTopics().then((value) => {
            topics.push(value);
          });

          return { data: topics };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Topics"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { getTopics } = topicApi;
