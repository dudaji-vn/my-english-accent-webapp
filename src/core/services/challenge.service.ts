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
      transformResponse: (response: { data: IListenTypePage }) => response.data,
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
