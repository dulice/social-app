import { configureStore } from "@reduxjs/toolkit"
import chatUserSlice from "./chatUser";
import timelineSlice from "./timelineSlice";
import { userApi } from "./userApi";
import userSlice from "./userSlice"

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        timelinePosts: timelineSlice.reducer,
        chatUser: chatUserSlice.reducer,
        [userApi.reducerPath]: userApi.reducer
    }
});

export default store;