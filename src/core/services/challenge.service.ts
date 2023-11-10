import { createApi } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import ChallengeController from "../controllers/challenge.controller";
import _ from "lodash";
import { IChallengeDetailDisplay, IChallengeDisplay, IChallengeSummaryDisplay } from "../type/challenge.type";
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

    getAllRecordInChallenge: builder.query<IChallengeSummaryDisplay, string>({
      query: (challengeId: string) => ChallengeController.getAllRecordInChallenge(challengeId),
      transformResponse: (response: { data: IChallengeSummaryDisplay }) => response.data,
    }),
  }),
});

export const { useGetChallengesInClubQuery, useGetChallengeDetailInClubQuery, useUpdateChallengeMemberMutation, useGetAllRecordInChallengeQuery, usePrefetch } = ChallengeApi;

export default ChallengeApi;
