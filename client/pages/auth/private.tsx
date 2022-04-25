import Link from '@components/_shared/Link';
import MainLayout from '@components/_layouts/MainLayout';
import { usePrivateQuery } from '@core/redux/services/private';
import { useLogoutMutation } from '@core/redux/services/auth';
import { useSelector } from 'react-redux';
import { selectUser } from '@core/redux/slices/authSlice';

const Form = (): JSX.Element => {
	const { isLogin } = useSelector(selectUser);

	const { data, isLoading, isSuccess } = usePrivateQuery(undefined);

	const [setLogout] = useLogoutMutation();

	if (isLoading) {
		return (
			<MainLayout title="Form" className="flex-cc col">
				<i className="spinner" />
			</MainLayout>
		);
	}

	if (!isLogin && !isLoading) {
		return (
			<MainLayout title="Restricted Area" className="flex-cc col">
				<h1 className="mb-4 text-4xl font-bold">Restricted Area</h1>
				<Link href="/" className="px-4 py-2 text-white bg-accent hover:bg-opacity-80">
					BACK HOME
				</Link>
			</MainLayout>
		);
	}

	return (
		<>
			<MainLayout title="Form" className="flex-cc col">
				<h1 className="mb-4 text-4xl font-bold">Form</h1>

				{isLoading && <p>Loading...</p>}
				{isSuccess && JSON.stringify(data)}

				<button
					type="submit"
					className="p-2 text-white bg-black my-3"
					data-loading={isLoading}
					onClick={() => setLogout('')}
				>
					Log Out <i className="spinner"></i>
				</button>
				<Link href="/" className="px-4 py-2 text-white bg-accent hover:bg-opacity-80">
					BACK HOME
				</Link>
			</MainLayout>
		</>
	);
};

export default Form;
