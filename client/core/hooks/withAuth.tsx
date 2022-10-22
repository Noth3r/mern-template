import { useRefreshQuery } from '@core/redux/services/auth';
import { selectUser } from '@core/redux/slices/authSlice';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function withAuth(Component) {
	const AuthenticatedComponent = () => {
		const router = useRouter();
		const { isLogin } = useSelector(selectUser);
		const { isError } = useRefreshQuery(undefined, {
			skip: isLogin,
		});

		if (!isLogin && isError) {
			router.push('/login');
		}

		return isLogin ? <Component /> : null;
	};

	return AuthenticatedComponent;
}
