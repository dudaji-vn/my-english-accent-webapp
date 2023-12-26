import Reducer from "@/shared/const/store.const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GoogleApiController from "../controllers/google.controller";
import { IGoogleSpeechToText, ISpeechRecognition } from "../type/google.type";
import { EMPTY_TRANSCRIPT } from "../type";

export const GoogleApi = createApi({
  reducerPath: Reducer.googleApi,
  baseQuery: fetchBaseQuery(),
  tagTypes: ["STT"],
  endpoints: (builder) => ({
    speechToText: builder.query<IGoogleSpeechToText, string>({
      query: (voiceFile) => GoogleApiController.speechToText(voiceFile),
      providesTags: (result, error, arg) => (arg ? [{ type: "STT" as const, text: arg }, "STT"] : ["STT"]),
      transformResponse: (response: ISpeechRecognition) => {
        const { results } = response;

        let theHighestConfident = 0;
        let finalTranscript = EMPTY_TRANSCRIPT;

        if (!results || results.length === 0) {
          return {
            finalTranscript: EMPTY_TRANSCRIPT,
            transcripts: [],
          };
        }
        results?.forEach((result) => {
          result.alternatives?.forEach((alternative) => {
            const { confidence, transcript: transcriptSource } = alternative;

            if (confidence > theHighestConfident) {
              theHighestConfident = confidence;
              finalTranscript = transcriptSource;
            }
          });
        });
        return {
          finalTranscript: finalTranscript,
          transcripts: results[0].alternatives.map((item) => {
            return {
              transcript: item.transcript,
              confidence: item.confidence,
            };
          }),
        };
      },
    }),
  }),
});

export const { useLazySpeechToTextQuery } = GoogleApi;

export default GoogleApi;
