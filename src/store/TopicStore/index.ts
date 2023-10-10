import Store from "@/shared/const/store.const";
import { persist } from "@/shared/utils/persist.util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicStoreType {
  topics: [];
}

const initialState: TopicStoreType = {
  topics: [],
};

const topicSlice = createSlice({
  name: Store.topic,
  initialState,
  reducers: {
    getAllTopics: (
      state: TopicStoreType,
      action: PayloadAction<{ token: string }>
    ) => {},
  },
});

export const { getAllTopics } = topicSlice.actions;

export default topicSlice.reducer;
