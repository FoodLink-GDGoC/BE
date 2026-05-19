const express = require('express');
const router = express.Router();

router.use('/health', require('./health'));
router.use('/user', require('./user'));
router.use('/store', require('./store'));

module.exports = router;