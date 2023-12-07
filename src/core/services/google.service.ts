import Reducer from "@/shared/const/store.const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GoogleApiController from "../controllers/google.controller";
import { ISpeechRecognition } from "../type/google.type";

export const GoogleApi = createApi({
  reducerPath: Reducer.googleApi,
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    timeout: 30000,
    credentials: "same-origin",
    mode: "cors",
    redirect: "follow",
  }),
  tagTypes: ["TTS", "STT"],
  endpoints: (builder) => ({
    textToSpeech: builder.query<any, string>({
      query: (text: string) => GoogleApiController.textToSpeech(text),
      providesTags: (result, error, arg) => (arg ? [{ type: "TTS" as const, text: arg }, "TTS"] : ["TTS"]),
      transformResponse: (response: {
        data: {
          audioContent: {
            data: number[];
            type: string;
          };
        };
      }) => {
        return response.data.audioContent;
      },
    }),
    speechToText: builder.query<any, string>({
      query: (dataBase64: string) => GoogleApiController.speechToText(dataBase64),
      providesTags: (result, error, arg) => (arg ? [{ type: "STT" as const, text: arg }, "STT"] : ["STT"]),
      transformResponse: (response: ISpeechRecognition) => {
        const transcript = response?.results[0]?.alternatives[0]?.transcript;
        return transcript ?? "";
      },
    }),
  }),
});

export const { useLazyTextToSpeechQuery, useLazySpeechToTextQuery } = GoogleApi;

export default GoogleApi;
