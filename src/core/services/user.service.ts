import { UserType } from "@/shared/type";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Query from "@/shared/const/queryApi.const";
import UserController from "../controllers/user.controller";
import persist from "@/shared/utils/persist.util";

export const UserApi = createApi({
  reducerPath: Query.user,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<UserType, { userName: string; password: string }>({
      async queryFn(payload) {
        try {
          let myInfo = {} as UserType;
          (await UserController.login(payload)).forEach((user) => {
            myInfo = { userId: user.id, ...user.data() } as UserType;
          });
          persist.saveMyInfo(myInfo);
          return { data: myInfo };
        } catch (error) {
          return { error };
        }
      },
    }),
    getUsers: builder.query<UserType[], void>({
      async queryFn() {
        try {
          const users: UserType[] = [];
          (await UserController.getUsers()).forEach((user) => {
            users.push({ userId: user.id, ...user.data() } as UserType);
          });
          return { data: users };
        } catch (error) {
          return { error };
        }
      },
    }),
    favoriteUsers: builder.mutation<any, string[]>({
      async queryFn(usersId: string[]) {
        try {
          const myInfo = persist.getMyInfo();
          const res = await UserController.favoriteUsers(
            myInfo.userId,
            usersId
          );
          persist.saveMyInfo({
            ...myInfo,
            favoriteUserIds: usersId,
          });
          return {
            data: res,
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetUsersQuery, useFavoriteUsersMutation } =
  UserApi;

export default UserApi;
