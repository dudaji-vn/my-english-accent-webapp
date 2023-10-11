import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import TopicController from "@/core/controllers/topic.controller";
import Query from "@/shared/const/queryApi.const";
import VocabularyController from "@/core/controllers/vocabulary.controller";
import RecordController from "@/core/controllers/record.controller";
import _, { filter } from "lodash";
import {
  RecordType,
  StageExercise,
  TopicType,
  TopicUIType,
  VocabularyType,
} from "@/shared/type";

const calculateStageTopic = (vocabularies: VocabularyType[]) => {
  const result = {};
  const filterIsRecord = vocabularies.filter((voca) => voca.isRecord);
  if (filterIsRecord.length === vocabularies.length) {
    Object.assign(result, {
      stage: StageExercise.Close,
      totalPhrase: filterIsRecord.length,
      currentPhrase: filterIsRecord.length,
    });
  } else if (filterIsRecord.length == 0) {
    Object.assign(result, {
      stage: StageExercise.Open,
      totalPhrase: vocabularies.length,
      currentPhrase: 0,
    });
  } else if (filterIsRecord.length < vocabularies.length) {
    Object.assign(result, {
      stage: StageExercise.Inprogress,
      totalPhrase: vocabularies.length,
      currentPhrase: filterIsRecord.length,
    });
  }
  return result;
};

export const TopicApi = createApi({
  reducerPath: Query.topic,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTopics: builder.query<TopicUIType[], void>({
      async queryFn() {
        try {
          const userId = "idUser2JLpns9SQblwSgNigfTwF";

          let topics: TopicType[] = [];
          let vocabularies: VocabularyType[] = [];
          let records: RecordType[] = [];

          //firebase db
          (await TopicController.getTopics()).forEach((value) => {
            topics.push({ topicId: value.id, ...value.data() } as TopicType);
          });

          (await VocabularyController.getVocabularies()).forEach((value) => {
            vocabularies.push({
              vocabularyId: value.id,
              ...value.data(),
            } as VocabularyType);
          });

          (await RecordController.getRecords(userId)).forEach((value) => {
            records.push({ recordId: value.id, ...value.data() } as RecordType);
          });

          const vocaPopulateRecord: VocabularyType[] = vocabularies.map(
            (vocabulary: VocabularyType) => {
              const findRecordMatch = records.find(
                (record: RecordType) =>
                  record.vocabularyId === vocabulary.vocabularyId
              );
              return !!findRecordMatch
                ? {
                    ...vocabulary,
                    isRecord: true,
                    voiceRecordSrc: findRecordMatch.voiceSrc,
                  }
                : {
                    ...vocabulary,
                    isRecord: false,
                    voiceRecordSrc: "",
                  };
            }
          );

          const groupTopicId: Pick<TopicType, "topicId" | "vocabularies">[] =
            _.chain(vocaPopulateRecord)
              .groupBy("topicId")
              .map((value, key) => {
                console.log("topicId", value);
                return { topicId: key, vocabularies: value };
              })
              .value();

          const merged: Omit<
            TopicType,
            "stage" | "currentStep" | "currentPhrase"
          >[] = _.mergeWith(groupTopicId, topics);

          const result: TopicUIType[] = merged.map((topic) => {
            const progressObject = calculateStageTopic(topic.vocabularies);
            return {
              ...topic,
              ...progressObject,
            } as unknown as TopicUIType;
          });

          return { data: result };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTopicsQuery } = TopicApi;

export default TopicApi;
