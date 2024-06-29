import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = process.env.REACT_APP_API_URL + "/api/posts";
export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    addPost: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
        headers: { authorization: `Bearer ${body.token}` },
      }),
      invalidatesTags: ["Posts"],
    }),
    addComment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/comment/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, token, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: ({ id, token }) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Posts"]
    }),
    getPosts: builder.query({
      query: () => "/",
      providesTags: ["Posts"],
    }),
    getPost: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Posts"],
    }),
    getTimeLinePosts: builder.query({
      query: (url) => url,
      providesTags: ["Posts"],
    }),
    getnotOwnerPosts: builder.query({
      query: (userId) => `/not/${userId}`,
      providesTags: ["Posts"],
    }),
    getOwnerPosts: builder.query({
      query: (userId) => `/post/${userId}`,
      providesTags: ["Posts"],
    }),
    getSearchPosts: builder.query({
      query: (q) => `/search?q=${q}`,
      providesTags: ["Posts"],
    }),
  }),
});

export const {
  useAddPostMutation,
  useAddCommentMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useGetPostQuery,
  useGetTimeLinePostsQuery,
  useGetnotOwnerPostsQuery,
  useGetOwnerPostsQuery,
  useGetSearchPostsQuery,
} = postApi;
