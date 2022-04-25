const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken, verifyJwt } = require('../helpers/jwt');
const User = require('../models/user');

/* Sign in */
const signin = async (req, res) => {
	const { email, password } = req.body;
	let user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({
			message: 'User not found',
		});
	}

	/* validate password */
	if (!bcrypt.compareSync(password, user.password)) {
		return res.status(400).json({
			message: 'Invalid credentials',
		});
	}

	const data = {
		name: user.name || '',
		email: user.email,
		description: user.description || '',
		pictureFileURL: user.pictureFileURL || '',
	};

	return sendToken(user, 200, res, data);
};

const signup = async (req, res) => {
	let { email, password } = req.body;
	let user = await User.findOne({ email });

	/* If email is already used */
	if (user) {
		return res.status(400).json({
			message: 'Email already used',
		});
	}

	/* Hash password */
	const hash = bcrypt.hashSync(password, 10);

	user = new User({
		email,
		password: hash,
	});

	user.save((error) => {
		if (error) return res.status(500).json({ message: error.message });
		return res.status(201).json({
			message: 'User signed up successfully',
			data: user,
		});
	});
};

const signout = (req, res) => {
	res.clearCookie('refreshToken');
	res.status(200).json({
		success: true,
		message: 'Logout successful',
	});
};

/* Get user profile */
const getProfile = async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) return res.status(404).json({ message: 'User not found' });
	return res.status(200).json({
		data: {
			name: user.name || '',
			email: user.email,
			description: user.description || '',
			pictureFileURL: user.pictureFileURL || '',
			isAdmin: user.isAdmin || false,
		},
	});
};

const refreshToken = async (req, res) => {
	const token = req.cookies.refreshToken;
	if (!token) return res.status(401).json({ message: 'No token' });

	const { payload, _ } = verifyJwt(token, process.env.JWT_REFRESH_SECRET);

	if (!payload) return res.status(401).json({ message: 'Invalid token' });

	sendToken(payload, 200, res);
};

const sendToken = (user, statusCode, res, message) => {
	const refreshToken = createRefreshToken(user);
	const accessToken = createAccessToken(user);

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: 60 * 1000 * 60 * 24 * 7,
		secure: true,
		SameSite: 'strict',
	});

	res.status(statusCode).json({
		success: true,
		message: { ...message, token: accessToken },
	});
};

module.exports = {
	signup,
	signin,
	getProfile,
	sendToken,
	refreshToken,
	signout,
};
