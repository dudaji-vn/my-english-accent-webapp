import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import RecordController from "@/core/controllers/record.controller";
<<<<<<< Updated upstream
import {
  RecordTypeResponse,
  UserType,
  VocabularyTypeResponse,
} from "@/shared/type";
=======
import { UserType } from "@/shared/type";
>>>>>>> Stashed changes
import Store from "@/shared/const/store.const";
import UserController from "../controllers/user.controller";
import _ from "lodash";
import VocabularyController from "../controllers/vocabulary.controller";
<<<<<<< Updated upstream

export interface RecordByManyUserResponse
  extends RecordTypeResponse,
    VocabularyTypeResponse {
=======
import { RecordTypeResponse, VocabularyTypeResponse } from "../type";

export interface RecordByManyUserResponse extends RecordTypeResponse, VocabularyTypeResponse {
>>>>>>> Stashed changes
  userInfo: UserType[];
}

export const RecordApi = createApi({
  reducerPath: Store.recordApi,
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

<<<<<<< Updated upstream
          const recordResponse = await RecordController.getRecordsByManyUser(
            payload.usersId
          );

          const vocabulariesId: string[] = _.unionBy(
            recordResponse,
            "vocabularyId"
          ).map((val) => val.vocabularyId);

          const vocabularyResponse =
            await VocabularyController.filterVocabularies(
              payload.topicId,
              vocabulariesId
            );

          const populatedUser: UserType[] = _.unionBy(
            recordResponse,
            "userId"
          ).reduce((acc: any, currentValue) => {
            const found = userResponse.find(
              (user) => user.userId === currentValue.userId
            );
            return found ? [...acc, found] : [...acc];
          }, []);

          const populatedRecord = recordResponse.reduce(
            (acc: any, currentVal) => {
              const found = populatedUser.find(
                (user) => user.userId === currentVal.userId
              );

              if (found) {
                const merged = _.merge(currentVal, found);
                return [...acc, merged];
              }
              return [...acc];
            },
            []
          );
=======
          const recordResponse = await RecordController.getRecordsByManyUser(payload.usersId);

          const vocabulariesId: string[] = _.unionBy(recordResponse, "vocabularyId").map((val) => val.vocabularyId);

          const vocabularyResponse = await VocabularyController.filterVocabularies(payload.topicId, vocabulariesId);

          const populatedUser: UserType[] = _.unionBy(recordResponse, "userId").reduce((acc: any, currentValue) => {
            const found = userResponse.find((user) => user.userId === currentValue.userId);
            return found ? [...acc, found] : [...acc];
          }, []);

          const populatedRecord = recordResponse.reduce((acc: any, currentVal) => {
            const found = populatedUser.find((user) => user.userId === currentVal.userId);

            if (found) {
              const merged = _.merge(currentVal, found);
              return [...acc, merged];
            }
            return [...acc];
          }, []);
>>>>>>> Stashed changes

          const groupRecordByVocaId = _.chain(populatedRecord)
            .groupBy("vocabularyId")
            .map((value, key) => ({ vocabularyId: key, records: value }))
            .value();

          console.log("groupRecordByVocaId", groupRecordByVocaId);
          const recordVoiceSrc = [];
          const result = vocabularyResponse.reduce((acc: any, currentVal) => {
<<<<<<< Updated upstream
            const found = groupRecordByVocaId.find(
              (vocaId) => vocaId.vocabularyId === currentVal.vocabularyId
            );
=======
            const found = groupRecordByVocaId.find((vocaId) => vocaId.vocabularyId === currentVal.vocabularyId);
>>>>>>> Stashed changes

            if (found) {
              const merged = _.merge(currentVal, found);
              return [...acc, merged];
            }
            return [...acc];
          }, []);
          return {
            data: result,
            meta: {
              currentIndex: 0,
              maxIndex: result.length > 0 ? result.length - 1 : result.length,
            },
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
<<<<<<< Updated upstream
          const recordResponse = await RecordController.getRecords(
            payload.userId
          );

          const vocabularyReponse = await VocabularyController.getVocabularies(
            payload.topicId
          );

          const populatedVoca = recordResponse.reduce(
            (acc: any, currentVal) => {
              const found = vocabularyReponse.find(
                (record) => record.vocabularyId === currentVal.vocabularyId
              );
              if (found) {
                recordVoiceSrc.push(currentVal.recordVoiceSrc);
                const merged = _.merge(currentVal, found);
                return [...acc, merged];
              }
              return [...acc];
            },
            []
          );
=======
          const recordResponse = await RecordController.getRecords(payload.userId);

          const vocabularyReponse = await VocabularyController.getVocabularies(payload.topicId);

          const populatedVoca = recordResponse.reduce((acc: any, currentVal) => {
            const found = vocabularyReponse.find((record) => record.vocabularyId === currentVal.vocabularyId);
            if (found) {
              recordVoiceSrc.push(currentVal.recordVoiceSrc);
              const merged = _.merge(currentVal, found);
              return [...acc, merged];
            }
            return [...acc];
          }, []);
>>>>>>> Stashed changes

          return {
            data: populatedVoca,
            meta: recordVoiceSrc,
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
<<<<<<< Updated upstream
export const { useSaveRecordMutation, useGetRecordsQuery, useGetRecordQuery } =
  RecordApi;
=======
export const { useSaveRecordMutation, useGetRecordsQuery, useGetRecordQuery } = RecordApi;
>>>>>>> Stashed changes
export default RecordApi;
