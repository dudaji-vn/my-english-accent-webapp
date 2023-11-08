import { createApi } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import ClubController from "../controllers/club.controller";
import { ClubRequest, IClubDisplay } from "../type";
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
      query: ClubController.addClub,
      transformResponse: (response: { data: string }) => response.data,
      invalidatesTags: (result) => (result ? [{ type: "Club" as const, id: result }, "Club"] : ["Club"]),
    }),

    updateClub: builder.mutation<string, ClubRequest>({
      query: ClubController.updateClub,
      transformResponse: (response: { data: string }) => response.data,
      invalidatesTags: (result) => (result ? [{ type: "Club" as const, id: result }, "Club"] : ["Club"]),
    }),

    // getMembersInfo: builder.query<{ ownerInfo: UserResponseType; membersInfo: UserResponseType[] }, string>({
    //   async queryFn(clubId: string) {
    //     try {
    //       const res: ClubResponseType[] = await ClubController.getClubById(clubId);
    //       const ownerInfo: UserResponseType[] = [];
    //       const membersInfo: UserResponseType[] = [];
    //       if (res && res.length > 0) {
    //         const firstClub = res[0];
    //         const ownerId = firstClub.ownerUserId;
    //         const memembersId = firstClub.members.map((userId) => userId);
    //         await UserController.getUsersBy([ownerId]).then((val) => ownerInfo.push(...val.flat()));
    //         await UserController.getUsersBy(memembersId).then((val) => membersInfo.push(...val.flat()));
    //       }

    //       return {
    //         data: { ownerInfo: ownerInfo[0], membersInfo: membersInfo },
    //       };
    //     } catch (error) {
    //       return { error };
    //     }
    //   },
    //   providesTags: (result, error, arg) => (arg ? [{ type: "Club" as const, id: arg }, "Club"] : ["Club"]),
    // }),

    // getClubDetail: builder.query<ClubResponseType | null, string>({
    //   async queryFn(clubId: string) {
    //     try {
    //       let firstResponse = null;
    //       const response = await ClubController.getClubById(clubId);
    //       if (response && response.length > 0) {
    //         firstResponse = response[0];
    //       }
    //       return {
    //         data: firstResponse,
    //       };
    //     } catch (error) {
    //       return { error };
    //     }
    //   },
    // }),
  }),
});

export const { useGetClubsQuery, useAddClubMutation, useUpdateClubMutation } = ClubStudyApi;

export default ClubStudyApi;
