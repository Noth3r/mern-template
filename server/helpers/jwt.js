const jwt = require('jsonwebtoken');

/* Create token */
const createRefreshToken = ({ _id, name, email, isAdmin }) => {
	return jwt.sign({ _id, name, email, isAdmin }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: process.env.JWT_REFRESH_EXPIRED_IN,
	});
};

const createAccessToken = ({ _id, name, email, isAdmin }) => {
	return jwt.sign({ _id, name, email, isAdmin }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: process.env.JWT_ACCESS_EXPIRED_IN,
	});
};

/* Verify JWT */
const verifyJwt = (token, key) => {
	try {
		const decoded = jwt.verify(token, key);
		return { payload: decoded, expired: false };
	} catch (err) {
		return { payload: null, expired: err.message.includes('jwt expired') };
	}
};

module.exports = { createRefreshToken, createAccessToken, verifyJwt };
