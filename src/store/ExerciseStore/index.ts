import Store from "@/shared/const/store.const";
import {
  TopicType,
  IExerciseType,
  StageExercise,
  TopicUIType,
  VocabularyType,
} from "@/shared/type";
import persist from "@/shared/utils/persist.util";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IExerciseType = {
  store: [],
  filter: {
    topicId: "",
    vocabularies: [],
    stage: 0,
    totalPhrase: 0,
    currentPhrase: 0,
    name: "",
  },
  vocabularies: [],
  vocabularyIndex: 0,
};

const exerciseStore = createSlice({
  name: Store.exercise,
  initialState,
  reducers: {
    getExerciseByStage: (
      state: any,
      { payload }: PayloadAction<StageExercise>
    ) => {},
    saveSelection: (
      state,
      { payload }: PayloadAction<Omit<TopicUIType, "imgSrc">>
    ) => {
      const result = {
        ...state.filter,
        ...payload,
        ...payload.vocabularies[state.vocabularyIndex],
      };
      state.filter = result;
      state.vocabularies = payload.vocabularies;
      persist.saveVocabulary(result);
    },
    nextVocabulary: (state) => {
      const result = {
        ...state.filter,
        ...state.vocabularies[state.vocabularyIndex],
      };
      console.log(result);
      // state.filter = result;
      // persist.saveVocabulary(result);
    },
    populatedVoca: (state) => {
      // dummyExercise.forEach((item) => {
      //   if (item.topicId === state.filter?.topicId) {
      //     const result = dummyVocabulary.filter((dVoca) =>
      //       item.idVocabulary.includes(dVoca.idVocabulary)
      //     );
      //     state.populatedVocabulary = [...result];
      //   }
      // });
    },
  },
});

export const {
  getExerciseByStage,
  saveSelection,
  populatedVoca,
  nextVocabulary,
} = exerciseStore.actions;

export default exerciseStore.reducer;
