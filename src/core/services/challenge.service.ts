import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import ClubController from "../controllers/club.controller";
import { ClubRequest, ClubResponseType, ClubVocabularyTypeResponse, IClubDisplay, UserResponseType } from "../type";
import UserController from "../controllers/user.controller";
import ChallengeController from "../controllers/challenge.controller";
import VocabularyController from "../controllers/vocabulary.controller";
import _ from "lodash";
import { IChallengeDisplay } from "../type/challenge.type";

export const ChallengeApi = createApi({
  reducerPath: Reducer.challengeApi,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Challenge"],
  endpoints: (builder) => ({
    getChallengesInClub: builder.query<IChallengeDisplay[], string>({
      async queryFn(clubId: string) {
        try {
          const challenges = await ChallengeController.getChallengesInClub(clubId);

          const challengesId = challenges.map((challenge) => challenge.challengeId);

          const vocabularies: ClubVocabularyTypeResponse[] = [];
          await VocabularyController.getVocabularyOfClub(challengesId).then((val) => vocabularies.push(...val.flat()));

          const groupVocabularyByChallengeId = _(vocabularies)
            .groupBy("challengeId.id")
            .map((val, key) => ({
              challengeId: key,
              vocabularies: val,
            }))
            .value();

          const mergeVocabulary = _.merge({}, challenges, groupVocabularyByChallengeId);

          return {
            data: _.values(mergeVocabulary),
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetChallengesInClubQuery } = ChallengeApi;

export default ChallengeApi;
