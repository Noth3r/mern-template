import Link from '@components/_shared/Link';
import MainLayout from '@components/_layouts/MainLayout';
import { useForm } from 'react-hook-form';
import { usePostMutation } from '@core/redux/services/example';

interface FormType {
	nickname: string;
	city: string;
	story: string;
}

const Form = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [addPost, { isLoading, isSuccess, data }] = usePostMutation({
		fixedCacheKey: 'get', // to store the data in the cache
	});

	const handlePost = async (data: FormType) => {
		try {
			await addPost(data).unwrap(); //.unwrap() to unwrap the promise
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<MainLayout title="Form" className="flex-cc col">
				<h1 className="mb-4 text-4xl font-bold">Form</h1>
				<form onSubmit={handleSubmit(handlePost)} className="flex-cs col gap-4 mb-12">
					<label htmlFor="nickname" className="flex flex-col">
						<input
							type="text"
							name="nickname"
							{...register('nickname', { required: 'Nickname required' })}
							placeholder="Who are you?"
							className={`border p-1 ${errors.nickname && 'border-red-500'}`}
						/>
						{errors.nickname && (
							<span className="text-red-500">{errors.nickname.message}</span>
						)}
					</label>
					<label htmlFor="city" className="flex col">
						<input
							type="text"
							name="city"
							{...register('city', { required: 'City required' })}
							placeholder="Where you from?"
							className={`border p-1 ${errors.nickname && 'border-red-500'}`}
						/>
						{errors.city && <span className="text-red-500">{errors.city.message}</span>}
					</label>
					<label htmlFor="story" className="flex col full">
						<textarea
							name="story"
							{...register('story', { required: 'Story required' })}
							placeholder="What is your story?"
							className={`border p-1 ${errors.nickname && 'border-red-500'}`}
						/>
						{errors.story && (
							<span className="text-red-500">{errors.story.message}</span>
						)}
					</label>

					<button
						type="submit"
						className="p-2 ml-auto text-white bg-black"
						data-loading={isLoading}
					>
						SUBMIT <i className="spinner"></i>
					</button>
				</form>

				{isSuccess && JSON.stringify(data)}

				<Link href="/" className="px-4 py-2 text-white bg-accent hover:bg-opacity-80">
					BACK HOME
				</Link>
			</MainLayout>
		</>
	);
};

export default Form;
