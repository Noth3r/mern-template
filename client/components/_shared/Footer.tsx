import { HeartIcon } from '@heroicons/react/solid';
import React from 'react';
import Link from './Link';

const Footer = React.forwardRef<HTMLElement>((_, ref) => {
	return (
		<footer ref={ref} className="flex-cc gap-1 relative">
			Made with <HeartIcon className="w-5 text-red-600 animate-pulse" /> By{' '}
			<Link href="https://www.github.com/Noth3r" target="_blank">
				<strong>Noth3r</strong>
			</Link>
		</footer>
	);
});

export default Footer;
