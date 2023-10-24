import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import ClubController from "../controllers/club.controller";
import { ClubRequest, ClubResponseType, IClubDisplay, UserResponseType } from "../type";
import UserController from "../controllers/user.controller";
import ChallengeController from "../controllers/challenge.controller";
import VocabularyController from "../controllers/vocabulary.controller";

export const ClubStudyApi = createApi({
  reducerPath: Reducer.clubStudyApi,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Club"],
  endpoints: (builder) => ({
    getClubsOwner: builder.query<IClubDisplay, string>({
      async queryFn(userId: string) {
        try {
          const clubsJoined: ClubResponseType[] = [];
          await ClubController.getClubByUserId(userId, "members").then((val) => clubsJoined.push(...val.flat()));
          const clubsOwner: ClubResponseType[] = [];
          await ClubController.getClubByUserId(userId, "owner_user_id").then((val) => clubsOwner.push(...val.flat()));

          const response: IClubDisplay = {
            clubsJoined: clubsJoined.sort(function (x, y) {
              return y.created.seconds - x.created.seconds;
            }),
            clubsOwner: clubsOwner.sort(function (x, y) {
              return y.created.seconds - x.created.seconds;
            }),
          };

          return {
            data: response,
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Club"],
    }),

    setClub: builder.mutation<string, ClubRequest>({
      async queryFn(payload: ClubRequest) {
        try {
          await ClubController.updateClub(payload);

          //add new challenge default data
          if (!payload.members) {
            const challenge_id = await ChallengeController.addChallenge(payload.clubId!);
            await VocabularyController.updateVocabularyOfClub(challenge_id);
          }
          return {
            data: payload.clubId,
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result) => (result ? [{ type: "Club" as const, id: result }, "Club"] : ["Club"]),
    }),

    getMembersInfo: builder.query<{ ownerInfo: UserResponseType; membersInfo: UserResponseType[] }, string>({
      async queryFn(clubId: string) {
        try {
          console.log("getMembersInfo::clubId::", clubId);
          const res: ClubResponseType[] = await ClubController.getMembers(clubId);
          console.log("getMembersInfo::res::", res);
          const ownerInfo: UserResponseType[] = [];
          const membersInfo: UserResponseType[] = [];
          if (res && res.length > 0) {
            const firstClub = res[0];
            const ownerId = firstClub.ownerUserId;
            console.log(ownerId.id);
            const memembersId = firstClub.members.map((userId) => userId);
            await UserController.getUsersBy([ownerId]).then((val) => ownerInfo.push(...val.flat()));
            await UserController.getUsersBy(memembersId).then((val) => membersInfo.push(...val.flat()));
          }

          return {
            data: { ownerInfo: ownerInfo[0], membersInfo: membersInfo },
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, arg) => (arg ? [{ type: "Club" as const, id: arg }, "Club"] : ["Club"]),
    }),
  }),
});

export const { useGetClubsOwnerQuery, useSetClubMutation, useGetMembersInfoQuery } = ClubStudyApi;

export default ClubStudyApi;
