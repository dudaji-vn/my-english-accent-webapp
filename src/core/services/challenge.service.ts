import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import { ClubVocabularyTypeResponse, RecordRequest, RecordTypeResponse, UserResponseType, VocabularyTypeResponse } from "../type";
import ChallengeController from "../controllers/challenge.controller";
import VocabularyController from "../controllers/vocabulary.controller";
import _ from "lodash";
import { IChallengeDetailDisplay, IChallengeDisplay, IChallengeSummaryDisplay, IListenTypePage } from "../type/challenge.type";
import RecordController from "../controllers/record.controller";
import persist from "@/shared/utils/persist.util";
import UserController from "../controllers/user.controller";
import baseQuery from "..";

export const ChallengeApi = createApi({
  reducerPath: Reducer.challengeApi,
  baseQuery: baseQuery,
  tagTypes: ["Challenge"],
  endpoints: (builder) => ({
    getChallengesInClub: builder.query<IChallengeDisplay[], string>({
      query: (clubId: string) => ChallengeController.getChallengesInClub(clubId),
      transformResponse: (response: { data: IChallengeDisplay[] }) => response.data,
      // invalidatesTags: (result) => (result ? [{ type: "Challenge" as const, id: result }, "Challenge"] : ["Challenge"]),
    }),

    getChallengeDetailInClub: builder.query<IChallengeDetailDisplay, string>({
      query: (challengeId: string) => ChallengeController.getChallengeDetailInClub(challengeId),
      transformResponse: (response: { data: IChallengeDetailDisplay }) => response.data,
    }),

    updateChallengeMember: builder.mutation<boolean, string>({
      query: (challengeId: string) => ChallengeController.updateChallengeMember(challengeId),
      transformResponse: (response: { data: boolean }) => response.data,
    }),
  }),
});

export const { useGetChallengesInClubQuery, useGetChallengeDetailInClubQuery, useUpdateChallengeMemberMutation, usePrefetch } = ChallengeApi;

export default ChallengeApi;
