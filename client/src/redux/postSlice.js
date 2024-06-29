import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        post: {},
        likeCount: 0,
        showModal: { isShow: false, postId: null},
    },
    reducers: {
        singlePost: (state, action) => {
            state.post = action.payload;
        },
        likeCount: (state, action) => {
            state.likeCount = action.payload;
        },
        showModal: (state, action) => {
            state.showModal = action.payload;
        }
    }
})

export const postAction = postSlice.actions;
export default postSlice;