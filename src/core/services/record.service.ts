import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Query from "@/shared/const/queryApi.const";
import RecordController from "@/core/controllers/record.controller";
import { RecordType, VocabularyType } from "@/shared/type";
import VocabularyController from "../controllers/vocabulary.controller";

export const RecordApi = createApi({
  reducerPath: Query.record,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getRecords: builder.query<RecordType[], void>({
      async queryFn() {
        try {
          let records: RecordType[] = [];
          const userId = "idUser2JLpns9SQblwSgNigfTwF";
          const response = await RecordController.getRecords(userId);
          response.forEach((value) => {
            records.push({ recordId: value.id, ...value.data() } as RecordType);
          });
          return { data: records };
        } catch (error) {
          return { error };
        }
      },
    }),
    saveRecord: builder.mutation<any, any>({
      async queryFn(payload) {
        try {
          const response = await RecordController.addRecord(payload);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
    }),
    getRecordsByManyUser: builder.query<any, string[]>({
      async queryFn(usersId: string[]) {
        try {
          const records: RecordType[] = [];
          const vocabulariesId: string[] = [];
          const vocabularies: VocabularyType[] = [];

          const recordResponse = await RecordController.getRecordsByManyUser(
            usersId
          );
          recordResponse.forEach((value) => {
            vocabulariesId.push(value.data().vocabularyId);
            records.push({ recordId: value.id, ...value.data() } as RecordType);
          });

          const vocabularyResponse =
            await VocabularyController.filterVocabularies(vocabulariesId);
          vocabularyResponse.forEach((value) => {
            vocabularies.push({
              vocabularyId: value.id,
              ...value.data(),
            } as VocabularyType);
          });

          console.log("getRecordsByManyUser::", records);
          console.log("vocabularyResponse", vocabularies);
          return { data: vocabularies };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
export const {
  useGetRecordsQuery,
  useSaveRecordMutation,
  useGetRecordsByManyUserQuery,
} = RecordApi;
export default RecordApi;
