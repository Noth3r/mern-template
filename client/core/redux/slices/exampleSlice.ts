import { createSlice } from '@reduxjs/toolkit';
import { exampleApi } from '../services/example';
import { RootState } from '../store';

const slice = createSlice({
	name: 'example',
	initialState: {
		form: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(exampleApi.endpoints.post.matchFulfilled, (state, { payload }) => {
			state.form = payload;
		});
	},
});

export default slice.reducer;
export const selectForm = (state: RootState) => state.exampleReducer;
