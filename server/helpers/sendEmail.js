const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
	const oauth2Client = new OAuth2(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		'https://developers.google.com/oauthplayground'
	);

	oauth2Client.setCredentials({
		refresh_token: process.env.OAUTH_REFRESH_TOKEN,
	});

	const accessToken = await new Promise((resolve, reject) => {
		oauth2Client.getAccessToken((err, token) => {
			if (err) {
				reject(err);
			}
			resolve(token);
		});
	});

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.EMAIL,
			accessToken,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
		},
	});

	return transporter;
};

const sendEmail = async (options) => {
	const emailTransporter = await createTransporter();

	const mailOptions = {
		from: process.env.EMAIL,
		to: options.to,
		subject: options.subject,
		html: options.html,
	};

	emailTransporter.sendMail(mailOptions, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log('Email sent: ' + result.response);
		}
	});
};

module.exports = sendEmail;
