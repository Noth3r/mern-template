import Footer from '@components/_shared/Footer';
import SEOTags from '@components/_shared/SEOTags';
import useMinHeight from '@core/hooks/useMinHeight';
interface Props {
	children: React.ReactNode;
	title?: string;
	className?: string;
	style?: React.CSSProperties;
}

import Headers from '@components/_shared/Headers';

const MainLayout = ({ children, title, className, style }: Props): JSX.Element => {
	const [minHeight, margin, upperRef, lowerRef] = useMinHeight();

	return (
		<>
			<SEOTags title={title} />

			<Headers ref={upperRef} />

			<main style={{ minHeight, ...style, marginTop: margin }} className={className}>
				{children}
			</main>

			<Footer ref={lowerRef} />
		</>
	);
};

export default MainLayout;
