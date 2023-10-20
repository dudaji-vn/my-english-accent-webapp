import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import RecordController from "@/core/controllers/record.controller";
import { UserType } from "@/shared/type";
import Reducer from "@/shared/const/store.const";
import UserController from "../controllers/user.controller";
import _ from "lodash";
import VocabularyController from "../controllers/vocabulary.controller";

//TODO: remove this file
export const RecordApi = createApi({
  reducerPath: Reducer.recordApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
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
    getRecords: builder.query<any, { usersId: string[]; topicId?: string }>({
      async queryFn(payload: { usersId: string[]; topicId: string }) {
        try {
          const userResponse = await UserController.getUsersBy(payload.usersId);

          return {
            data: userResponse,
          };
        } catch (error) {
          return { error };
        }
      },
    }),

    getRecord: builder.query<any, { userId: string; topicId?: string }>({
      async queryFn(payload: { userId: string; topicId?: string }) {
        try {
          const recordVoiceSrc: string[] = [];

          return {
            data: recordVoiceSrc,
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
export const { useSaveRecordMutation, useGetRecordsQuery, useGetRecordQuery } = RecordApi;
export default RecordApi;
