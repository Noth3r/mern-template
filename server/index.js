require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');

/* Database connection */
const connection = require('./helpers/db');
connection.once('open', () => console.log('Connected to database'));
connection.on('error', () => console.log('Error connecting to database'));

/* Initialize app */
const app = express();

/* CORS allow from localhost */
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

/* Cookie parser */
app.use(cookie());

/* Body parser */
app.use(express.json());

/* Routes */
const userRoutes = require('./routes/auth');

app.use('/api/auth', userRoutes);

/* Delete if you already change frontend example */
app.get('/api/hello', (req, res) => {
	res.status(200).json({ name: 'John Doe' });
});
app.post('/api/examplepost', (req, res) => {
	const data = req.body;

	res.status(200).json({ data });
});

/* Starting express server */
app.listen(process.env.PORT || 3000, () => {
	console.log('Express server has started on port ' + process.env.PORT);
});
