import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
import { NextPage } from 'next';
import React from 'react';

const About: NextPage = () => {
	return (
		<MainLayout title="about" className="flex flex-col items-center justify-center">
			About
			<Link href="/" className="px-4 py-2 text-black bg-white">
				BACK HOME
			</Link>
		</MainLayout>
	);
};

export default About;
