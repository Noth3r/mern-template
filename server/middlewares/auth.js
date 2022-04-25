const { verifyJwt } = require('../helpers/jwt');

const verifyToken = (req, res, next) => {
	const { refreshToken } = req.cookies;

	const accessToken = req.headers.authorization?.split(' ')[1];

	if (!refreshToken || !accessToken) return res.status(401).json({ message: 'Unauthorized' });

	const { payload: refreshPayload, expired: refreshExpired } = verifyJwt(
		refreshToken,
		process.env.JWT_REFRESH_SECRET
	);

	if (refreshExpired || !refreshPayload) return res.status(401).json({ message: 'Unauthorized' });

	const { payload, expired } = verifyJwt(accessToken, process.env.JWT_ACCESS_SECRET);

	if (expired || !payload) return res.status(401).json({ message: 'Unauthorized' });

	req.user = payload;
	next();
};

module.exports = { verifyToken };
