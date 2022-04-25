import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../utils';

export const privateApi = createApi({
	reducerPath: 'userPrivate',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		private: builder.query<any, any>({
			query: () => ({ url: 'auth/private' }),
		}),
	}),
});

export const { usePrivateQuery } = privateApi;
