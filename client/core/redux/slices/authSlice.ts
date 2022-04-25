import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { RootState } from '../store';

const auth = createSlice({
	name: 'auth',
	initialState: {
		isLogin: false,
		token: null,
	},
	reducers: {
		tokenReceived: (state, action) => {
			state.token = action.payload;
			state.isLogin = true;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
			state.token = payload.message.token;
			state.isLogin = true;
		});
		builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
			state.token = null;
			state.isLogin = false;
		});
	},
});

export default auth.reducer;
export const selectUser = (state: RootState) => state.authReducer;
export const userSlice = auth.actions;
