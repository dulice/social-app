import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';

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
    },
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.register.matchFulfilled, (state, action) => action.payload);
        builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => action.payload);
    }
});

export const userAction = userSlice.actions;
export default userSlice;