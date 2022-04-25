import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userSlice } from './slices/authSlice';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from './store';
import { authApi } from './services/auth';
import { Mutex } from 'async-mutex';

export const fetchQuery = (params?: String) =>
	fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api/' + (params ? params : ''),
		credentials: 'include',
	});

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000/api/',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		// By default, if we have a token in the store, let's use that for authenticated requests
		const token = (getState() as RootState).authReducer.token;
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		headers.set('Content-Type', 'application/json');
		return headers;
	},
});

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOption) => {
	await mutex.waitForUnlock();
	// check token from userReducer
	const token = (api.getState() as RootState).authReducer.token;
	let result: any;
	if (token) {
		result = await baseQuery(args, api, extraOption);
	}
	if (!token || (result.error && result.error.status === 401)) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult: any = await baseQuery('auth/refresh', api, extraOption);

				if (refreshResult.data) {
					api.dispatch(userSlice.tokenReceived(refreshResult.data.message.token));
					result = await baseQuery(args, api, extraOption);
				} else {
					if (token) {
						api.dispatch(authApi.endpoints.logout.initiate(undefined));
					}
					result = { error: { status: 401, message: 'Unauthorized' } };
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOption);
		}
	}
	return result;
};
