import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import persist from "@/shared/utils/persist.util";
import Reducer from "@/shared/const/store.const";
import { IUSerRegister, IUserLogin, UserResponseType } from "../type";
import baseQuery from "..";

export const UserApi = createApi({
  reducerPath: Reducer.userApi,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<UserResponseType, IUserLogin>({
      query: (payload) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: payload,
        };
      },
    }),
    register: builder.mutation<UserResponseType, IUSerRegister>({
      query: (payload) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = UserApi;

export default UserApi;
