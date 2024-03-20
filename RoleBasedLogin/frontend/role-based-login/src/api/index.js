import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "../Constants";
import { CACHE_TAG_TYPES } from "./cacheTagTypes";

const { SERVER_URL } = Constants;
export const DEFAULT_CACHE_SUBSCRIPTION_DURATION = 0;
export const api = createApi({
  reducerPath: "apiReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    keepUnusedDataFor: DEFAULT_CACHE_SUBSCRIPTION_DURATION,
    prepareHeaders: (headers, { getState }) => {
      //   const state = getState();
      //   const token = get(sessionStorage, "token") || get(state, "LoginSlice.loginToken");
      //   if (token) {
      //     headers.set("authorization", `Bearer ${token}`);
      //   }
      return headers;
    },
  }),
  tagTypes: CACHE_TAG_TYPES,
  endpoints: () => ({}),
});
export default api;

// prepareHeaders: A function that adds headers to the request. It includes logic to retrieve the authentication
// token from sessionStorage or the Redux state( LoginSlice.loginToken ) and adds it to the headers.;
