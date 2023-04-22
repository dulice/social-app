import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_URL + "/api/user";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["user"],
  
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = userApi;
