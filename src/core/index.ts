import persist from "@/shared/utils/persist.util";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_URL,
  timeout: 30000,
  prepareHeaders: (headers) => {
    const token = persist.getToken() ?? "";
    if (token) {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "same-origin",
  mode: "cors",
  redirect: "follow",
});
export default baseQuery;

export function isFetchBaseQueryError(err: unknown): err is FetchBaseQueryError {
  const { error } = err as { error: FetchBaseQueryError };
  return typeof err === "object" && err != null && "status" in error;
}

export function someHelperForTS<T>(result: QueryReturnValue<unknown, unknown, unknown>) {
  return result as QueryReturnValue<T, unknown, unknown>;
}
