import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: '/api/user'}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user
            })
        })
    })
})

export const { useRegisterMutation } = userApi;
