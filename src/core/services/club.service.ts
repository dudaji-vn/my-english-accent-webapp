import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import LectureController from "@/core/controllers/lecture.controller";
import Reducer from "@/shared/const/store.const";
import ClubController from "../controllers/club.controller";
import { ClubResponseType, IClubDisplay } from "../type";

export const ClubStudyApi = createApi({
  reducerPath: Reducer.clubStudyApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getClubsOwner: builder.query<IClubDisplay, string>({
      async queryFn(userId: string) {
        try {
          const clubsJoined: ClubResponseType[] = [];
          await ClubController.getClubByUserId(userId, "members").then((val) => clubsJoined.push(...val.flat()));
          const clubsOwner: ClubResponseType[] = [];
          await ClubController.getClubByUserId(userId, "owner_user_id").then((val) => clubsOwner.push(...val.flat()));

          const response: IClubDisplay = {
            clubsJoined,
            clubsOwner,
          };

          console.log(response);

          return {
            data: response,
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetClubsOwnerQuery } = ClubStudyApi;

export default ClubStudyApi;
