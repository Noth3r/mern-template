import { createApi, retry } from '@reduxjs/toolkit/query/react';
import { fetchQuery } from '../utils';

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery: fetchQuery('auth'),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({ url: 'signin', method: 'POST', body }),
			extraOptions: {
				backOff: () => {
					retry.fail({ fake: 'error' });
				},
			},
		}),
		register: builder.mutation({
			query: (body) => ({ url: 'signup', method: 'POST', body }),
			extraOptions: {
				backOff: () => {
					retry.fail({ fake: 'error' });
				},
			},
		}),
		refresh: builder.query({
			query: () => ({ url: 'refresh' }),
		}),
		logout: builder.mutation({
			query: () => ({ url: 'signout', method: 'POST' }),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useRefreshQuery, useLogoutMutation } =
	authApi;
