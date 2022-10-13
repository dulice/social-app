import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        post: {},
        comments: [],
        comment: '',
        likeCount: 0,
        showModal: false,
    },
    reducers: {
        fetchPost: (state, action) => {
            state.posts = action.payload;
        },
        singlePost: (state, action) => {
            state.post = action.payload;
        },
        commentsPost: (state, action) => {
            state.comments = action.payload;
        },
        commentPost: (state, action) => {
            state.comment = action.payload;
        },
        likeCount: (state, action) => {
            state.likeCount = action.payload;
        },
        showModal: (state, action) => {
            state.showModal = action.payload;
        },
    }
})

export const postAction = postSlice.actions;
export default postSlice;