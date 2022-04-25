const router = require('express').Router();
const { verifyToken } = require('../middlewares/auth');
const UserController = require('../controllers/auth');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.get('/', verifyToken, UserController.getProfile);
router.get('/refresh', UserController.refreshToken);
router.post('/signout', UserController.signout);

/* Delete if you already have private routes */
router.get('/private', verifyToken, (req, res) => {
	res.status(200).json({
		success: true,
	});
});

module.exports = router;
