import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_URL + "/api/";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["user"],

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "user/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "user/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    googleLogin: builder.mutation({
      query: (user) => ({
        url: "user/auth/google",
        method: "POST",
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, token, ...body }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body,
        headers: { authorization: `Bearer ${token}`}
      }),
      invalidatesTags: ["user"],
    }),
    followUser: builder.mutation({
      query: ({ currentUserId, ...body }) => ({
        url: `users/${currentUserId}/follow`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    UnfollowUser: builder.mutation({
      query: ({ currentUserId, ...body }) => ({
        url: `users/${currentUserId}/unfollow`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    getUser: builder.query({
      query: (userId) => `users/eachuser?userId=${userId}`,
      providesTags: ["user"]
    }),
    getAuthUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getToFollowUser: builder.query({
      query: ({userId, limit}) => `/users/tofollow/${userId}?limit=${limit}`,
      providesTags: ["user"]
    }),
    getFollowingUser: builder.query({
      query: (userId) => `/users/friends/${userId}`,
    })
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useUpdateUserMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserQuery,
  useGetAuthUserQuery,
  useGetToFollowUserQuery,
  useGetFollowingUserQuery,
} = userApi;
