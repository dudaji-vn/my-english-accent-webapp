import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import LectureController from "@/core/controllers/lecture.controller";
import VocabularyController from "@/core/controllers/vocabulary.controller";
import RecordController from "@/core/controllers/record.controller";
import _, { filter } from "lodash";
import { RecordType, StageExercise, TopicType, TopicUIType, VocabularyType } from "@/shared/type";
import Reducer from "@/shared/const/store.const";

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

export const LectureApi = createApi({
  reducerPath: Reducer.lectureApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTopics: builder.query<TopicUIType[], string>({
      async queryFn(userId: string) {
        try {
          const topics = await LectureController.getTopics();

          const vocabularies = await VocabularyController.getVocabularies();
          console.log("vocabularies", vocabularies);

          const records = await RecordController.getRecords(userId);

          console.log("records",records)

          const vocaPopulateRecord: VocabularyType[] = vocabularies.map((vocabulary: any) => {
            const findRecordMatch = records.find((record: any) => record.vocabularyId === vocabulary.vocabularyId);
            return !!findRecordMatch
              ? {
                  ...vocabulary,
                  isRecord: true,
                  voiceRecordSrc: findRecordMatch.rVoiceSrc,
                }
              : {
                  ...vocabulary,
                  isRecord: false,
                  voiceRecordSrc: "",
                };
          });

          const groupTopicId: Pick<TopicType, "vocabularies">[] = _.chain(vocaPopulateRecord)
            .groupBy("lectureId")
            .map((value, key) => {
              return { topicId: key, vocabularies: value };
            })
            .value();

          const merged: Omit<TopicType, "stage" | "currentStep" | "currentPhrase">[] = _.mergeWith(groupTopicId, topics);

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

export const { useGetTopicsQuery, useGetTopicTypeQuery } = LectureApi;

export default LectureApi;
