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
<<<<<<< Updated upstream
=======
          console.log(myInfo)
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          const res = await UserController.favoriteUsers(
            myInfo.userId,
            usersId
          );
=======
          const res = await UserController.favoriteUsers(myInfo.userId, usersId);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
export const { useLoginMutation, useGetUsersQuery, useFavoriteUsersMutation } =
  UserApi;
=======
export const { useLoginMutation, useGetUsersQuery, useFavoriteUsersMutation } = UserApi;
>>>>>>> Stashed changes

export default UserApi;
