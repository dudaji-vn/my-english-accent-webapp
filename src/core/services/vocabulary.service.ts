import Query from "@/shared/const/queryApi.const";
import VocabularyController from "@/core/controllers/vocabulary.controller";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { RecordType, StageExercise, VocabularyType } from "@/shared/type";
import RecordController from "../controllers/record.controller";
import { useGetRecordsQuery } from "./record.service";

export interface VocabularyResponseType {
  stage: StageExercise;
  totalPhrase: number;
  currentPhrase: number;
  vocabularies: VocabularyType[];
}

const calculateStage = (vocabularies: VocabularyType[]) => {
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

export const VocabularyApi = createApi({
  reducerPath: Query.vocabulary,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getVocabularies: builder.query<VocabularyResponseType, string>({
      async queryFn(topicId: string) {
        try {
          const userId = "idUser2JLpns9SQblwSgNigfTwF";
          const vocabularies: VocabularyType[] = [];
          const records: RecordType[] = [];

          (await VocabularyController.getVocabularies(topicId)).forEach(
            (value) => {
              vocabularies.push({
                vocabularyId: value.id,
                ...value.data(),
              } as VocabularyType);
            }
          );

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

          const progress = calculateStage(vocaPopulateRecord);
          const result = {
            ...progress,
            vocabularies,
          } as VocabularyResponseType;
          return { data: result };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetVocabulariesQuery } = VocabularyApi;

export default VocabularyApi;
