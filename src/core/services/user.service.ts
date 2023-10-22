import { UserType } from "@/shared/type";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import UserController from "../controllers/user.controller";
import persist from "@/shared/utils/persist.util";
import Reducer from "@/shared/const/store.const";
import { UserResponseType } from "../type";

export const UserApi = createApi({
  reducerPath: Reducer.userApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<UserType, { userName: string; password: string }>({
      async queryFn(payload) {
        try {
          const myInfo: any = await UserController.login(payload);
          console.log(myInfo);
          persist.saveMyInfo(myInfo);
          return { data: myInfo };
        } catch (error) {
          return { error };
        }
      },
    }),
    getUsers: builder.query<UserResponseType[], void>({
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
          const res = await UserController.favoriteUsers(myInfo.userId, usersId);
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

export const { useLoginMutation, useGetUsersQuery, useFavoriteUsersMutation } = UserApi;

export default UserApi;
