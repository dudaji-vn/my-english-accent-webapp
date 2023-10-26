import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import { ClubVocabularyTypeResponse, RecordRequest, RecordTypeResponse, UserResponseType, VocabularyTypeResponse } from "../type";
import ChallengeController from "../controllers/challenge.controller";
import VocabularyController from "../controllers/vocabulary.controller";
import _ from "lodash";
import { IChallengeDetailDisplay, IChallengeDisplay, IChallengeSummaryDisplay, IClubListenType } from "../type/challenge.type";
import RecordController from "../controllers/record.controller";
import persist from "@/shared/utils/persist.util";
import UserController from "../controllers/user.controller";

export const ChallengeApi = createApi({
  reducerPath: Reducer.challengeApi,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Challenge"],
  endpoints: (builder) => ({
    getChallengesInClub: builder.query<IChallengeDisplay[], string>({
      async queryFn(clubId: string) {
        try {
          const challenges = await ChallengeController.getChallengesInClub(clubId);

          const challengesId = challenges.map((challenge) => challenge.challengeId);

          const vocabularies: ClubVocabularyTypeResponse[] = [];
          await VocabularyController.getVocabularyOfClub(challengesId).then((val) => vocabularies.push(...val.flat()));

          const groupVocabularyByChallengeId = _(vocabularies)
            .groupBy("challengeId.id")
            .map((val, key) => ({
              challengeId: key,
              vocabularies: val,
            }))
            .value();

          const mergeVocabulary = _.merge({}, challenges, groupVocabularyByChallengeId);

          return {
            data: _.values(mergeVocabulary),
          };
        } catch (error) {
          return { error };
        }
      },
    }),

    getChallengeDetailInClub: builder.query<IChallengeDetailDisplay, string>({
      async queryFn(challengeId: string) {
        try {
          const challenge = await ChallengeController.getChallengeDetail(challengeId);

          const clubVocabularies: ClubVocabularyTypeResponse[] = [];
          await VocabularyController.getVocabularyOfClub([challengeId]).then((val) => clubVocabularies.push(...val.flat()));

          const vocabulariesId = clubVocabularies.map((voca) => voca.vocabularyId);
          const vocabularies = (await VocabularyController.getVocabulariesById(vocabulariesId)).flat();

          const mergeVocabulary: VocabularyTypeResponse[] & ClubVocabularyTypeResponse[] = _.merge({}, clubVocabularies, vocabularies);

          return {
            data: {
              ...challenge,
              vocabularies: _.values(mergeVocabulary),
            },
          };
        } catch (error) {
          return { error };
        }
      },
    }),

    addRecordChallenge: builder.mutation<boolean, RecordRequest>({
      async queryFn(payload: RecordRequest) {
        try {
          await RecordController.addRecord(payload);
          return { data: true };
        } catch (error) {
          console.error("Challenge::addRecordChallenge::", error);
          return { error };
        }
      },
      invalidatesTags: ["Challenge"],
    }),

    getAllRecordInChallenge: builder.query<IChallengeSummaryDisplay, string>({
      async queryFn(challengeId: string) {
        try {
          const myId = persist.getMyInfo().userId;
          const challenge = await ChallengeController.getChallengeDetail(challengeId);
          const records = await RecordController.getRecordsByChallengeId(myId, challengeId);

          const vocabulariesId = records.map((record) => record.vocabularyId);

          const vocabulariesRecord: VocabularyTypeResponse[] = [];
          await VocabularyController.getVocabulariesById(vocabulariesId).then((val) => vocabulariesRecord.push(...val.flat()));

          const users: UserResponseType[] = [];
          await UserController.getUsersBy(challenge.participants).then((val) => users.push(...val.flat()));

          const mergeVocabulary: RecordTypeResponse[] & VocabularyTypeResponse[] = _.merge({}, records, vocabulariesRecord);

          const result = {
            ...challenge,
            participants: users,
            vocabularies: _.values(mergeVocabulary),
          };

          // console.log("getAllRecordInChallenge", result);
          return { data: result };
        } catch (error) {
          console.error("Challenge::getAllRecordInChallenge::", error);
          return { error };
        }
      },
    }),

    updateChallengeMember: builder.mutation<boolean, string>({
      async queryFn(challengeId: string) {
        try {
          const myId = persist.getMyInfo().userId;
          await ChallengeController.updateChallenge(challengeId, myId);
          return { data: true };
        } catch (error) {
          console.error("Challenge::getAllRecordInChallenge::", error);
          return { error };
        }
      },
    }),
    getRecordToListen: builder.query<IClubListenType[], string>({
      async queryFn(challengeId: string) {
        try {
          const challenge = await ChallengeController.getChallengeDetail(challengeId);

          const usersId = challenge.participants.map((user) => user.id);

          const records: RecordTypeResponse[] = [];
          await RecordController.getRecordOfUsersByChallengeId(usersId, challengeId).then((val) => records.push(...val.flat()));

          const vocabulariesId = records.map((record) => record.vocabularyId);
          const vocabulariesRecord: VocabularyTypeResponse[] = [];
          await VocabularyController.getVocabulariesById(vocabulariesId).then((val) => vocabulariesRecord.push(...val.flat()));

          const users: UserResponseType[] = [];
          await UserController.getUsersBy(challenge.participants).then((val) => users.push(...val.flat()));

          const newRecord = records.map((record) => ({
            ...record,
            ...users.find((user) => user.userId === record.userId.id),
          }));

          const populatedVocabulary = _.chain(newRecord)
            .groupBy("vocabularyId.id")
            .map((value, key) => {
              const isFound = vocabulariesRecord.find((voca) => voca.vocabularyId === key);
              return {
                ...isFound,
                recordUser: value,
              };
            })
            .value() as IClubListenType[];

          console.log("getRecordToListen", populatedVocabulary);
          return { data: populatedVocabulary };
        } catch (error) {
          console.error("Challenge::getRecordToListen::", error);
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetChallengesInClubQuery,
  useGetChallengeDetailInClubQuery,
  useAddRecordChallengeMutation,
  useGetAllRecordInChallengeQuery,
  useUpdateChallengeMemberMutation,
  useGetRecordToListenQuery,
} = ChallengeApi;

export default ChallengeApi;
