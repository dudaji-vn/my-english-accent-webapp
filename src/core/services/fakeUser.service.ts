import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import persist from "@/shared/utils/persist.util";
import Reducer from "@/shared/const/store.const";
import UserController from "../controllers/user.controller";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { IUserLogin } from "../type";

export const FakeUserApi = createApi({
  reducerPath: Reducer.fakeUserApi,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<boolean, void>({
      queryFn: async () => {
        try {
          const provider = new GoogleAuthProvider();
          provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

          let isLogin = false;
          const response = await signInWithPopup(auth, provider)
            .then((r) => r)
            .catch((e) => console.log(e));

          if (response) {
            const googleId = response.user.uid;
            const email = response.user.email!;
            const avatarUrl = response.user.photoURL!;

            persist.saveProviderInfo({
              googleId,
              email,
              avatarUrl,
            } as IUserLogin & { avatarUrl: string });

            if (googleId && email) {
              const response = await UserController.login({
                googleId,
                email,
              });
              if (response.status === "success") {
                persist.saveMyInfo(response.data.user);
                persist.saveToken(response.data.token);
              }
              isLogin = response.status === "error";
            }
          }
          return { data: isLogin };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useLoginMutation } = FakeUserApi;

export default FakeUserApi;
