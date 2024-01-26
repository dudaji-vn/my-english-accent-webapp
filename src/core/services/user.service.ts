import { createApi } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import {
  IAddOrUpdateGoogleTranscript,
  IIsUserWinEvent,
  IUSerRegister,
  IUserProfile,
  IUsersRanking,
  UserResponseType,
} from "../type";
import baseQuery from "..";
import UserController from "../controllers/user.controller";

export const UserApi = createApi({
  reducerPath: Reducer.userApi,
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation<{ token: string; user: UserResponseType }, IUSerRegister>({
      query: UserController.register,
      transformResponse: (response: { data: { token: string; user: UserResponseType } }) => {
        return response.data;
      },
    }),
    isLogin: builder.query<IUserProfile, void>({
      query: UserController.isLogin,
      keepUnusedDataFor: 0,
      transformResponse: (response: { data: IUserProfile }) => {
        return response.data;
      },
    }),
    checkUserCompleteEvent: builder.query<IIsUserWinEvent, void>({
      query: () => UserController.checkUserCompleteEvent(),
      transformResponse: (response: { data: IIsUserWinEvent }) => {
        return response.data;
      },
    }),
    getAllUsers: builder.query<UserResponseType[], void>({
      query: UserController.getAllUsers,
      transformResponse: (response: { data: UserResponseType[] }) => {
        return response.data;
      },
    }),
    addOrUpdateGoogleTranscript: builder.mutation<boolean, IAddOrUpdateGoogleTranscript>({
      query: UserController.addOrUpdateGoogleTranscript,
      transformResponse: (response: { data: boolean }) => response.data,
    }),
    updateProfile: builder.mutation<IUserProfile, IUserProfile>({
      query: UserController.updateProfile,
      transformResponse: (response: { data: IUserProfile }) => response.data,
    }),
    getUsersRanking: builder.query<IUsersRanking[], void>({
      query: UserController.getUsersRanking,
      transformResponse: (response: { data: IUsersRanking[] }) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLazyIsLoginQuery,
  useGetAllUsersQuery,
  useLazyCheckUserCompleteEventQuery,
  useUpdateProfileMutation,
  useAddOrUpdateGoogleTranscriptMutation,
  useGetUsersRankingQuery,
} = UserApi;

export default UserApi;
