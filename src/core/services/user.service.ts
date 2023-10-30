import { UserType } from "@/shared/type";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import UserController from "../controllers/user.controller";
import persist from "@/shared/utils/persist.util";
import Reducer from "@/shared/const/store.const";
import { UserResponseType } from "../type";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";

export const UserApi = createApi({
  reducerPath: Reducer.userApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<boolean, void>({
      async queryFn() {
        try {
          const provider = new GoogleAuthProvider();
          provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

          let isLogin = false;
          const response = await signInWithPopup(auth, provider);
          if (response) {
            const userId = response.user.uid;
            if (userId) {
              isLogin = await UserController.login(userId);
            }
          }
          return { data: isLogin };
        } catch (error) {
          return { error };
        }
      },
    }),
    getUsers: builder.query<UserResponseType[], void>({
      async queryFn() {
        try {
          const myId = persist.getMyInfo().userId;
          const users = await UserController.getUsers(myId);
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
