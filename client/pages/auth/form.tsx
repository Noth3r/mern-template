import Link from '@components/_shared/Link';
import MainLayout from '@components/_layouts/MainLayout';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@core/redux/services/auth';
import { useState } from 'react';

interface FormType {
	email: string;
	password: string;
}

const Form = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState('');
	const isError = error.length > 0;

	const [login, { isLoading, isSuccess, data }] = useLoginMutation({});

	const handlePost = async (data: FormType) => {
		try {
			await login(data).unwrap(); //.unwrap() to unwrap the promise
		} catch (err) {
			setError(err.data.message);
			setTimeout(() => {
				setError('');
			}, 3000);
		}
	};

	return (
		<>
			<MainLayout title="Form" className="flex-cc col">
				<h1 className="mb-4 text-4xl font-bold">Form</h1>
				<form onSubmit={handleSubmit(handlePost)} className="flex-cs col gap-4 mb-12">
					<label htmlFor="email" className="flex flex-col">
						<input
							type="text"
							name="email"
							{...register('email', { required: 'Nickname required' })}
							placeholder="Your email"
							className={`border p-1 ${
								(errors.email || isError) && 'border-red-500'
							}`}
						/>
						{errors.email && (
							<span className="text-red-500">{errors.email.message}</span>
						)}
					</label>
					<label htmlFor="password" className="flex col">
						<input
							type="password"
							name="password"
							{...register('password', { required: 'Password required' })}
							placeholder="Password"
							className={`border p-1 ${
								(errors.nickname || isError) && 'border-red-500'
							}`}
						/>
						{errors.password && (
							<span className="text-red-500">{errors.password.message}</span>
						)}
					</label>
					{isError && <span className="text-red-500">{error}</span>}

					<button
						type="submit"
						className="p-2 ml-auto text-white bg-black"
						data-loading={isLoading}
					>
						SUBMIT <i className="spinner" />
					</button>
				</form>

				{isSuccess && JSON.stringify(data)}

				<Link href="/" className="px-4 py-2 text-white bg-accent hover:bg-opacity-80 mb-3">
					BACK HOME
				</Link>
				<Link
					href="/auth/private"
					className="px-4 py-2 text-white bg-accent hover:bg-opacity-80"
				>
					Go To Private Routes
				</Link>
			</MainLayout>
		</>
	);
};

export default Form;
