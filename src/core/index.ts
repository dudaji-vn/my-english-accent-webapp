import persist from "@/shared/utils/persist.util";
import { FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_URL,
  timeout: 30000,
  credentials: "same-origin",
  prepareHeaders: (headers) => {
    const token = persist.getToken() ?? "";
    if (token) {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export default baseQuery;

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}
