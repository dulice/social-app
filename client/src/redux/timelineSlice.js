import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
    name: 'timelinePosts',
    initialState: {
        posts: null
    },
    reducers: {
        feedPosts(state, action) {
            state.posts = action.payload;
        }
    }
});

export const timelineAction = timelineSlice.actions;
export default timelineSlice;