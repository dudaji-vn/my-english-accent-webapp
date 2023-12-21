import persist from "@/shared/utils/persist.util";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_URL,
  timeout: 30000,
  prepareHeaders: (headers) => {
    const token = persist.getToken() ?? "";
    if (token) {
      // headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "same-origin",
  mode: "cors",
  redirect: "follow",
});

export default baseQuery;
