import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "../api/userApi";
import chatUserSlice from "./chatUser";
import postSlice from "./postSlice";
import userSlice from "./userSlice"

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        chatUser: chatUserSlice.reducer,
        post: postSlice.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;