import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";

import Reducer from "@/shared/const/store.const";
import baseQuery from "..";

export const RecordApi = createApi({
  reducerPath: Reducer.recordApi,
  baseQuery: baseQuery,
  tagTypes: ["Record"],
  endpoints: (builder) => ({}),
});
export const {} = RecordApi;
export default RecordApi;
