import Reducer from "@/shared/const/store.const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalStoreType {
  recordPage: { vocabularyId: string; src: string }[];
}

const initialState: GlobalStoreType = {
  recordPage: [],
};

const globalSlice = createSlice({
  name: Reducer.globalStore,
  initialState,
  reducers: {
    saveRecord: (state: GlobalStoreType, action: PayloadAction<{ vocabularyId: string; src: string }>) => {
      const index = state.recordPage.findIndex((value) => value.vocabularyId === action.payload.vocabularyId);
      if (index === -1) {
        state.recordPage = [...state.recordPage, action.payload];
      } else {
        state.recordPage[index].src = action.payload.src;
      }
    },
  },
});

export const { saveRecord } = globalSlice.actions;

export default globalSlice.reducer;
