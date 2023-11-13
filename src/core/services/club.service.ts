import { createApi } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import ClubController from "../controllers/club.controller";
import { ClubRequest, IClubDisplay, UserResponseType } from "../type";
import baseQuery from "..";

export const ClubStudyApi = createApi({
  reducerPath: Reducer.clubStudyApi,
  baseQuery: baseQuery,
  tagTypes: ["Club"],
  endpoints: (builder) => ({
    getClubs: builder.query<IClubDisplay, void>({
      query: ClubController.getClubs,
      transformResponse: (response: { data: IClubDisplay }) => response.data,
      providesTags: ["Club"],
    }),

    addClub: builder.mutation<string, ClubRequest>({
      query: ClubController.addOrUpdateClub,
      transformResponse: (response: { data: string }) => response.data,
      invalidatesTags: (result) => (result ? [{ type: "Club" as const, id: result }, "Club"] : ["Club"]),
    }),

    updateClub: builder.mutation<string, ClubRequest>({
      query: ClubController.addOrUpdateClub,
      transformResponse: (response: { data: string }) => response.data,
      invalidatesTags: (result) => (result ? [{ type: "Club" as const, id: result }, "Club"] : ["Club"]),
    }),

    getALlMembersClub: builder.query<{ owner: UserResponseType; members: UserResponseType[] }, string>({
      query: ClubController.getAllMembersClub,
      transformResponse: (response: { data: { owner: UserResponseType; members: UserResponseType[] } }) => response.data,
    }),
  }),
});

export const { useGetClubsQuery, useAddClubMutation, useUpdateClubMutation, useGetALlMembersClubQuery } = ClubStudyApi;

export default ClubStudyApi;
