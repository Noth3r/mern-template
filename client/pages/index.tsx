import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
import { useGetQuery } from '@core/redux/services/example';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	const { data, isLoading, isSuccess } = useGetQuery();

	return (
		<MainLayout title="Home" className="relative flex-sc col">
			<h1 className="mt-12 md:mt-48 mb-4 text-4xl font-bold text-center">
				Next (Basic) Starter
			</h1>
			<p className="mb-8 max-w-sm text-center">
				The template for a quick and intuitive workflow with Next.js and tailwindcss{' '}
				{isLoading && 'loading...'}
				{isSuccess && data.name}
			</p>

			<div className="flex-cc gap-4">
				<Link href="/about" className="px-4 py-2 text-white bg-accent hover:bg-opacity-80">
					ABOUT
				</Link>
				<Link href="/form" className="px-4 py-2 text-white bg-black hover:bg-opacity-80">
					FORM
				</Link>
				<Link
					href="/auth/form"
					className="px-4 py-2 text-white bg-accent hover:bg-opacity-80"
				>
					AUTH
				</Link>
			</div>

			<div className="absolute bottom-0 flex-cc col w-full h-1/4 bg-cover">
				<p className="flex-cc gap-1 text-lg">
					See the{' '}
					<Link
						href="https://github.com/stackoverprof/next-starter"
						target="_blank"
						className="font-bold underline"
					>
						original repository
					</Link>
				</p>
				<p className="flex-cc gap-1 text-lg">
					See the{' '}
					<Link
						href="https://github.com/noth3r/next-template"
						target="_blank"
						className="font-bold underline"
					>
						repository
					</Link>
				</p>
			</div>
		</MainLayout>
	);
};

export default Home;
