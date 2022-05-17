const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');
//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;