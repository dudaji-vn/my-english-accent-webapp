import Reducer from "@/shared/const/store.const";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "..";
import ChallengeController from "../controllers/challenge.controller";
import { IChallengeDetailDisplay, IChallengeDisplay, IChallengeSummaryDisplay, IListenTypePage } from "../type/challenge.type";

export const ChallengeApi = createApi({
  reducerPath: Reducer.challengeApi,
  baseQuery: baseQuery,
  tagTypes: ["Challenge"],
  endpoints: (builder) => ({
    getChallengesInClub: builder.query<IChallengeDisplay[], string>({
      query: (clubId: string) => ChallengeController.getChallengesInClub(clubId),
      transformResponse: (response: { data: IChallengeDisplay[] }) => response.data,
      providesTags: (result, error, arg) => (arg ? [{ type: "Challenge" as const, clubId: arg }, "Challenge"] : ["Challenge"]),
    }),

    getChallengeDetailInClub: builder.query<IChallengeDetailDisplay, string>({
      query: (challengeId: string) => ChallengeController.getChallengeDetailInClub(challengeId),
      transformResponse: (response: { data: IChallengeDetailDisplay }) => response.data,
      providesTags: (result, error, arg) => (arg ? [{ type: "Challenge" as const, challengeId: arg }, "Challenge"] : ["Challenge"]),
    }),

    updateChallengeMember: builder.mutation<boolean, string>({
      query: (challengeId: string) => ChallengeController.updateChallengeMember(challengeId),
      transformResponse: (response: { data: boolean }) => response.data,
      invalidatesTags: (result, error, arg) => (arg ? [{ type: "Challenge" as const, challengeId: arg }, "Challenge"] : ["Challenge"]),
    }),

    getAllRecordInChallenge: builder.query<IChallengeSummaryDisplay, string>({
      query: (challengeId: string) => ChallengeController.getAllRecordInChallenge(challengeId),
      transformResponse: (response: { data: IChallengeSummaryDisplay }) => response.data,
    }),

    getRecordToListenByChallenge: builder.query<IListenTypePage, string>({
      query: (challengeId: string) => ChallengeController.getRecordToListenByChallenge(challengeId),
      // transformResponse: (response: { data: IListenTypePage }) => response.data,
      transformResponse: (response: { data: IListenTypePage }) => {
        return {
          participants: [
            {
              lectureId: "1",
              recordUser: [
                {
                  userName: "Thien",
                  nickName: "Thien 1",
                  recordId: "record1",
                  vocabularyId: "voca1",
                  userId: "user1",
                  avatarUrl: "",
                  created: new Date(),
                  displayLanguage: "vn",
                  email: "",
                  favoriteUserIds: [],
                  googleId: "",
                  nativeLanguage: "vn",
                  rCreated: new Date(),
                  rUpdated: new Date(),
                  updated: new Date(),
                  voiceSrc:
                    "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Fclub%2FJZmtmDXf1Rw0xblPIvm6%2F29naHOmbC2NGRP9DqFON?alt=media&token=b159cded-2213-4c30-bedc-0767dd6e785c",
                },
                {
                  userName: "Thien",
                  nickName: "Thien",
                  recordId: "record2",
                  vocabularyId: "voca1",
                  userId: "user2",
                  avatarUrl: "",
                  created: new Date(),
                  displayLanguage: "vn",
                  email: "",
                  favoriteUserIds: [],
                  googleId: "",
                  nativeLanguage: "vn",
                  rCreated: new Date(),
                  rUpdated: new Date(),
                  updated: new Date(),
                  voiceSrc:
                    "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Fnonclub%2FFFqPhagP8GPWmIt9m3dB%2F29naHOmbC2NGRP9DqFON?alt=media&token=f61b76db-4c91-4b8d-8614-7ddfabf71bc0",
                },
              ],
              vCreated: new Date(),
              vocabularyId: "voca1",
              vphoneticDisplayLanguage: "hello",
              vtitleDisplayLanguage: "hello",
              vUpdated: new Date(),
            },
            {
              lectureId: "2",
              recordUser: [
                {
                  userName: "Thien",
                  nickName: "Thien 4",
                  recordId: "record4",
                  vocabularyId: "voca2",
                  userId: "user4",
                  avatarUrl: "",
                  created: new Date(),
                  displayLanguage: "vn",
                  email: "",
                  favoriteUserIds: [],
                  googleId: "",
                  nativeLanguage: "vn",
                  rCreated: new Date(),
                  rUpdated: new Date(),
                  updated: new Date(),
                  voiceSrc:
                    "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Fnonclub%2FUMFnWgQxndtMpyRFhA7C%2FDRzkoxv6bLW6FP7aVrZh?alt=media&token=923cd98e-0bb8-4f5c-9a07-6eb56725b67c",
                },
                {
                  userName: "Thien",
                  nickName: "Thien 2",
                  recordId: "record3",
                  vocabularyId: "voca2",
                  userId: "user3",
                  avatarUrl: "",
                  created: new Date(),
                  displayLanguage: "vn",
                  email: "",
                  favoriteUserIds: [],
                  googleId: "",
                  nativeLanguage: "vn",
                  rCreated: new Date(),
                  rUpdated: new Date(),
                  updated: new Date(),
                  voiceSrc:
                    "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Fnonclub%2FJZmtmDXf1Rw0xblPIvm6%2Fvzb8HU0Kg3tVeGtR215B?alt=media&token=ef7efc81-e9f7-4c18-8078-67866c6124c0",
                },
              ],
              vCreated: new Date(),
              vocabularyId: "voca1",
              vphoneticDisplayLanguage: "hello",
              vtitleDisplayLanguage: "hello",
              vUpdated: new Date(),
            },
          ],
          vocabularies: [
            {
              lectureId: "1",

              vCreated: new Date(),
              vocabularyId: "voca1",
              vphoneticDisplayLanguage: "hello",
              vtitleDisplayLanguage: "hello",
              vUpdated: new Date(),
            },
            {
              lectureId: "2",

              vCreated: new Date(),
              vocabularyId: "voca2",
              vphoneticDisplayLanguage: "hi",
              vtitleDisplayLanguage: "hi",
              vUpdated: new Date(),
            },
          ],
        } as any;
      },
    }),
  }),
});

export const {
  useGetChallengesInClubQuery,
  useGetChallengeDetailInClubQuery,
  useUpdateChallengeMemberMutation,
  useGetAllRecordInChallengeQuery,
  useGetRecordToListenByChallengeQuery,
  usePrefetch,
} = ChallengeApi;

export default ChallengeApi;
