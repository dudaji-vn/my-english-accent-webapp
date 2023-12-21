import Reducer from "@/shared/const/store.const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GoogleApiController from "../controllers/google.controller";
import { ISpeechRecognition } from "../type/google.type";
import { EMPTY_TRANSCRIPT } from "../type";

export const GoogleApi = createApi({
  reducerPath: Reducer.googleApi,
  baseQuery: fetchBaseQuery(),
  tagTypes: ["STT"],
  endpoints: (builder) => ({
    speechToText: builder.query<any, string>({
      query: (voiceFile) => GoogleApiController.speechToText(voiceFile),
      providesTags: (result, error, arg) => (arg ? [{ type: "STT" as const, text: arg }, "STT"] : ["STT"]),
      transformResponse: (response: ISpeechRecognition) => {
        const { results } = response;

        let theHighestConfident = 0;
        let transcript = "";

        results?.forEach((result) => {
          result.alternatives?.forEach((alternative) => {
            const { confidence, transcript: transcriptSource } = alternative;

            if (confidence > theHighestConfident) {
              theHighestConfident = confidence;
              transcript = transcriptSource;
            }
          });
        });

        return transcript.length > 0 ? transcript : EMPTY_TRANSCRIPT;
      },
    }),
  }),
});

export const { useLazySpeechToTextQuery } = GoogleApi;

export default GoogleApi;
