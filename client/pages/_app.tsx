import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { store } from '@core/redux/store';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="theme-color" content="#000000" />
			</Head>
			<NextNProgress
				color="#000"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				options={{ showSpinner: false }}
			/>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	);
};

export default App;
