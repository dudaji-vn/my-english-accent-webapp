import { UserType } from "@/shared/type";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import UserController from "../controllers/user.controller";
import persist from "@/shared/utils/persist.util";
import Store from "@/shared/const/store.const";

export const UserApi = createApi({
  reducerPath: Store.userApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<UserType, { userName: string; password: string }>({
      async queryFn(payload) {
        try {
          const myInfo: any = await UserController.login(payload);
          persist.saveMyInfo(myInfo);
          return { data: myInfo };
        } catch (error) {
          return { error };
        }
      },
    }),
    getUsers: builder.query<any[], void>({
      async queryFn() {
        try {
          const users = await UserController.getUsers();
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
