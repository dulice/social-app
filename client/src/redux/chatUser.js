import { createSlice } from '@reduxjs/toolkit';

const chatUser = JSON.parse(localStorage.getItem('chatUser'));
const chatUserSlice = createSlice({
    name: 'chatUser',
    initialState: {
        user: chatUser || null,
    },
    reducers: {
        showChatUser(state, action) {
            state.user = action.payload;
        },
        closeChatUser(state) {
            state.user = null;
        }
    }
});

export const chatUserAction = chatUserSlice.actions;
export default chatUserSlice;