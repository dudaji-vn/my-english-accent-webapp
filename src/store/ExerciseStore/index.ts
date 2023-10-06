import Store from "@/shared/const/store.const";
import { ExerciseStage, ExerciseType } from "@/shared/type";
import { PayloadAction, createSlice, current, nanoid } from "@reduxjs/toolkit";

interface IExerciseStoreType {
  [k: number]: Omit<ExerciseType, "stage">[];
}
export interface IExerciseType {
  store: IExerciseStoreType;
  filter: Partial<ExerciseType>;
}
const initialState: IExerciseType = {
  store: {
    0: [
      {
        imgSrc: "",
        title: "General",
        currentPhrase: 2,
        totalPhrase: 6,
        phraseSecondaryLanguage:
          "Please unshare your screen, I will share my screen.",
        ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
        phrasePrimaryLanguage:
          "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
        id: nanoid(),
      },
      {
        imgSrc: "",
        title: "General1",
        currentPhrase: 2,
        totalPhrase: 6,
        phraseSecondaryLanguage:
          "Please unshare your screen, I will share my screen.",
        ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
        phrasePrimaryLanguage:
          "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
        id: nanoid(),
      },
    ],
    1: [
      {
        imgSrc: "",
        title: "Product Design",
        currentPhrase: 2,
        totalPhrase: 6,
        phraseSecondaryLanguage:
          "Please unshare your screen, I will share my screen.",
        ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
        phrasePrimaryLanguage:
          "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
        id: nanoid(),
      },
      {
        imgSrc: "",
        title: "Product Design1",
        currentPhrase: 2,
        totalPhrase: 6,
        phraseSecondaryLanguage:
          "Please unshare your screen, I will share my screen.",
        ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
        phrasePrimaryLanguage:
          "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
        id: nanoid(),
      },
    ],
    2: [
      {
        imgSrc: "",
        title: "Product Development",
        currentPhrase: 2,
        totalPhrase: 6,
        phraseSecondaryLanguage:
          "Please unshare your screen, I will share my screen.",
        ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
        phrasePrimaryLanguage:
          "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
        id: nanoid(),
      },
      {
        imgSrc: "",
        title: "Product Development1",
        currentPhrase: 2,
        totalPhrase: 6,
        phraseSecondaryLanguage:
          "Please unshare your screen, I will share my screen.",
        ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
        phrasePrimaryLanguage:
          "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
        id: nanoid(),
      },
    ],
  },
  filter: {
    imgSrc: "",
    title: "",
    currentPhrase: 0,
    totalPhrase: 0,
    phraseSecondaryLanguage: ",",
    ipa: ".",
    id: "",
    stage: 0,
  },
};

const exerciseStore = createSlice({
  name: Store.exercise,
  initialState,
  reducers: {
    getExerciseByStage: (
      state: any,
      { payload }: PayloadAction<ExerciseStage>
    ) => {},
    filterExerciseBy: (
      state,
      { payload }: PayloadAction<Partial<ExerciseType>>
    ) => {
      state.filter = {
        ...state.store[payload.stage!!].find((item) => item.id == payload.id),
        stage: payload.stage!!,
      };
    },
  },
});

export const { getExerciseByStage, filterExerciseBy } = exerciseStore.actions;

export default exerciseStore.reducer;
