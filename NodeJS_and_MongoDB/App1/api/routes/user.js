const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserControllers.user_signup);

router.post('/login', UserControllers.user_login);

router.get('/remove/:userID', checkAuth, UserControllers.user_delete);

module.exports = router;