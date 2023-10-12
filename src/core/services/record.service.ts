import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import Query from "@/shared/const/queryApi.const";
import RecordController from "@/core/controllers/record.controller";
import { RecordType } from "@/shared/type";

export const RecordApi = createApi({
  reducerPath: Query.record,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getRecords: builder.query<RecordType[], void>({
      async queryFn() {
        try {
          let records: RecordType[] = [];
          const userId = "idUser2JLpns9SQblwSgNigfTwF";
          const response = await RecordController.getRecords(userId);
          response.forEach((value) => {
            records.push({ recordId: value.id, ...value.data() } as RecordType);
          });
          return { data: records };
        } catch (error) {
          return { error };
        }
      },
    }),
    saveRecord: builder.mutation<any, any>({
      async queryFn(payload) {
        try {
          const response = await RecordController.addRecord(payload);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
export const { useGetRecordsQuery, useSaveRecordMutation } = RecordApi;
export default RecordApi;
