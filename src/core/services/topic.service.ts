import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import TopicController from "../controllers/topic.controller";
import Query from "@/shared/const/queryApi.const";
import VocabularyController from "../controllers/vocabulary.controller";
import RecordController from "../controllers/record.controller";
import _ from "lodash";

export const TopicApi = createApi({
  reducerPath: Query.topic,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTopics: builder.query<any, void>({
      async queryFn() {
        try {
          const userId = "idUser2JLpns9SQblwSgNigfTwF";

          let topics: any = [];
          let vocabularies: any = [];
          let records: any = [];

          (await TopicController.getTopics()).forEach((value) => {
            topics.push({ topicId: value.id, ...value.data() });
          });

          (await VocabularyController.getVocabularies()).forEach((value) => {
            vocabularies.push({ vocabularyId: value.id, ...value.data() });
          });

          (await RecordController.getRecords(userId)).forEach((value) => {
            records.push({ recordId: value.id, ...value.data() });
          });

          const tmp = records.filter((record: any) => {
            return vocabularies.find(
              (vocabulary: any) =>
                vocabulary.vocabularyId === record.vocabularyId
            );
          });

          console.log("topics=>>", topics);
          console.log("vocabularies", vocabularies[0]);
          console.log("records", records[0]);

          return { data: topics };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTopicsQuery } = TopicApi;
