import { dummyExercise, dummyVocabulary } from "@/config/dummyData";
import Store from "@/shared/const/store.const";
import { TopicType, IExerciseType, StageExercise } from "@/shared/type";
import { persist } from "@/shared/utils/persist.util";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IExerciseType = {
  store: [],
  filter: {
    topicId: "",
    topicName: "",
    imgSrc: "",
    stage: 0,
    totalPhrase: 0,
    currentPhrase: 0,
    titlePrimaryLanguage: "",
    titleSecondaryLanguage: "",
    ipa: "",
    voiceSrc: "",
    idVocabulary: [],
  },
  populatedVocabulary: [],
};

const exerciseStore = createSlice({
  name: Store.exercise,
  initialState,
  reducers: {
    getExerciseByStage: (
      state: any,
      { payload }: PayloadAction<StageExercise>
    ) => {},
    filterExerciseBy: (
      state,
      { payload }: PayloadAction<Pick<TopicType, "topicId">>
    ) => {
      dummyExercise.forEach((item) => {
        if (item.topicId == payload.topicId) {
          const isFound = dummyVocabulary.find((dVoca) =>
            item.idVocabulary.includes(dVoca.idVocabulary)
          );
          if (isFound) {
            const result = {
              ...state.filter,
              ...isFound,
              ...item,
            };
            state.filter = result;
            persist.saveVocabulary(result);
          }
        }
      });
    },
    nextVocabulary: (
      state,
      { payload }: PayloadAction<{ currentStep: number }>
    ) => {
      const nextStep = payload.currentStep + 1;
      const result = JSON.parse(persist.getVocabulary()!!);

      const foundItem = dummyVocabulary.find(
        (dVoca) => dVoca.idVocabulary === result.idVocabulary[nextStep]
      );

      if (!!foundItem) {
        const { idVocabulary, ...restValue } = foundItem;
        const result = {
          ...state.filter,
          ...restValue,
          currentPhrase: nextStep,
        };

        state.filter = result;
        persist.saveVocabulary(result);
      } else {
        state.filter = {
          ...state.filter,
          stage: StageExercise.Close,
        };
      }
    },
    populatedVoca: (state) => {
      dummyExercise.forEach((item) => {
        if (item.topicId === state.filter?.topicId) {
          const result = dummyVocabulary.filter((dVoca) =>
            item.idVocabulary.includes(dVoca.idVocabulary)
          );
          state.populatedVocabulary = [...result];
        }
      });
    },
  },
});

export const {
  getExerciseByStage,
  filterExerciseBy,
  populatedVoca,
  nextVocabulary,
} = exerciseStore.actions;

export default exerciseStore.reducer;
