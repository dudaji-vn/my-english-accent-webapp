import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Query from "@/shared/const/queryApi.const";
import RecordController from "@/core/controllers/record.controller";

export const RecordApi = createApi({
  reducerPath: Query.record,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getRecords: builder.query<any, void>({
      async queryFn() {
        try {
          let records: any = [];
          const userId = "idUser2JLpns9SQblwSgNigfTwF";
          const response = await RecordController.getRecords(userId);
          response.forEach((value) => {
            records.push({ recordId: value.id, ...value.data() });
          });
          return { data: records };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
export const { useGetRecordsQuery } = RecordApi;
