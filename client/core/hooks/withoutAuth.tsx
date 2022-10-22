import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function withoutAuth(gssp: GetServerSideProps) {
	return async function (ctx: GetServerSidePropsContext) {
		const { req } = ctx;

		if (req.cookies.refreshToken) {
			return {
				redirect: {
					destination: '/',
					statusCode: 302,
				},
			};
		}

		return await gssp(ctx);
	};
}
