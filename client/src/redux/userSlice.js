import { createSlice } from '@reduxjs/toolkit';

const currentUser = JSON.parse(localStorage.getItem('user'));
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: currentUser || null,
    },
    reducers: {
        register(state, action) {
            state.user = action.payload;
        },      
        logout(state) {
            state.user = null;
        }
    }
});

export const userAction = userSlice.actions;
export default userSlice;