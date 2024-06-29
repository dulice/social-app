import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "../api/userApi";
import chatUserSlice from "./chatUser";
import postSlice from "./postSlice";
import userSlice from "./userSlice"
import { postApi } from "../api/postApi";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        chatUser: chatUserSlice.reducer,
        post: postSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, postApi.middleware),
});

export default store;