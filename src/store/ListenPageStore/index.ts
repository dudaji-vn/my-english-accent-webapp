import { RecordApi, LectureApi } from "@/core/services";
import Reducer from "@/shared/const/store.const";
import { UserType } from "@/shared/type";
import persist from "@/shared/utils/persist.util";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

interface TopicStoreType {
  quote: string;
  topicId: string;
  userInfo: Partial<UserType>;
  numberRecords: number;
  numberUsers: {
    min: number;
    max: number;
    current: number;
  };
  recordsVoiceSrc: string[];
}

const initialState: TopicStoreType = {
  quote: "",
  topicId: "",
  userInfo: {},
  numberRecords: 0,
  numberUsers: {
    min: 0,
    max: 0,
    current: 0,
  },
  recordsVoiceSrc: [],
};

const listenPageSlice = createSlice({
  name: Reducer.listenPage,
  initialState,
  reducers: {
    saveQuote: (state: TopicStoreType, { payload }: PayloadAction<string>) => {
      state.quote = payload;
    },
    saveTopicId: (state: TopicStoreType, { payload }: PayloadAction<string>) => {
      state.topicId = payload;
    },
    saveUserInfo: (state: TopicStoreType, { payload }: PayloadAction<Partial<UserType>>) => {
      state.userInfo = { ...state.userInfo, ...payload };
    },
    saveNumberRecords: (state: TopicStoreType, { payload }: PayloadAction<number>) => {
      state.numberRecords = payload;
    },
    saveIndexNumberUsers: (state: TopicStoreType, { payload }: PayloadAction<number>) => {
      const { min, max, current } = state.numberUsers;
      if (min < payload && max > payload) {
        state.numberUsers.current = payload;
      }
      if (payload <= min) {
        state.numberUsers.current = 0;
      }
      if (payload >= max) {
        state.numberUsers.current = max;
      }
    },
  },
});

export const { saveQuote, saveTopicId, saveNumberRecords, saveIndexNumberUsers, saveUserInfo } = listenPageSlice.actions;

export default listenPageSlice.reducer;
