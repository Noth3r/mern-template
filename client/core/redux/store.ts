import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './services/auth';
import { exampleApi } from './services/example';
import exampleSlice from './slices/exampleSlice';
import { privateApi } from './services/private';
import authSlice from './slices/authSlice';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
	configureStore({
		reducer: {
			[authApi.reducerPath]: authApi.reducer,
			[exampleApi.reducerPath]: exampleApi.reducer,
			[privateApi.reducerPath]: privateApi.reducer,
			exampleReducer: exampleSlice,
			authReducer: authSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				authApi.middleware,
				exampleApi.middleware,
				privateApi.middleware
			),
		...options,
	});

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
