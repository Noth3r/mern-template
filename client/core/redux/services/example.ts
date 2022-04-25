import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchQuery } from '../utils';

export const exampleApi = createApi({
	reducerPath: 'example',
	baseQuery: fetchQuery(),
	endpoints: (builder) => {
		return {
			get: builder.query<any, void>({
				query: () => 'hello',
			}),
			post: builder.mutation<any, any>({
				query: (body) => ({ url: 'examplepost', method: 'POST', body }),
			}),
		};
	},
});

export const { useGetQuery, usePostMutation } = exampleApi;
