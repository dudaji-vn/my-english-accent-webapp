import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import TopicController from "@/core/controllers/topic.controller";
import VocabularyController from "@/core/controllers/vocabulary.controller";
import RecordController from "@/core/controllers/record.controller";
import _, { filter } from "lodash";
<<<<<<< Updated upstream
import {
  RecordType,
  StageExercise,
  TopicType,
  TopicUIType,
  VocabularyType,
} from "@/shared/type";
=======
import { RecordType, StageExercise, TopicType, TopicUIType, VocabularyType } from "@/shared/type";
>>>>>>> Stashed changes
import Store from "@/shared/const/store.const";

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
  reducerPath: Store.topicApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTopics: builder.query<TopicUIType[], void>({
      async queryFn() {
        try {
          const userId = "idUser2JLpns9SQblwSgNigfTwF";

          //firebase db
          const topics = await TopicController.getTopics();

          const vocabularies = await VocabularyController.getVocabularies();

          const records = await RecordController.getRecords(userId);

<<<<<<< Updated upstream
          const vocaPopulateRecord: VocabularyType[] = vocabularies.map(
            (vocabulary: any) => {
              const findRecordMatch = records.find(
                (record: any) => record.vocabularyId === vocabulary.vocabularyId
              );
              return !!findRecordMatch
                ? {
                    ...vocabulary,
                    isRecord: true,
                    voiceRecordSrc: findRecordMatch.recordVoiceSrc,
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
                return { topicId: key, vocabularies: value };
              })
              .value();

          const merged: Omit<
            TopicType,
            "stage" | "currentStep" | "currentPhrase"
          >[] = _.mergeWith(groupTopicId, topics);
=======
          const vocaPopulateRecord: VocabularyType[] = vocabularies.map((vocabulary: any) => {
            const findRecordMatch = records.find((record: any) => record.vocabularyId === vocabulary.vocabularyId);
            return !!findRecordMatch
              ? {
                  ...vocabulary,
                  isRecord: true,
                  voiceRecordSrc: findRecordMatch.recordVoiceSrc,
                }
              : {
                  ...vocabulary,
                  isRecord: false,
                  voiceRecordSrc: "",
                };
          });

          const groupTopicId: Pick<TopicType, "topicId" | "vocabularies">[] = _.chain(vocaPopulateRecord)
            .groupBy("topicId")
            .map((value, key) => {
              return { topicId: key, vocabularies: value };
            })
            .value();

          const merged: Omit<TopicType, "stage" | "currentStep" | "currentPhrase">[] = _.mergeWith(groupTopicId, topics);
>>>>>>> Stashed changes

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
      keepUnusedDataFor: 0,
    }),
    getTopicType: builder.query<TopicType[], void>({
      async queryFn() {
        try {
          const topics: any = await TopicController.getTopics();
          //default topicId
          return { data: topics };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTopicsQuery, useGetTopicTypeQuery } = TopicApi;

export default TopicApi;
