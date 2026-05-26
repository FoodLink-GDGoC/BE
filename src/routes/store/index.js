const express = require('express');
const router = express.Router();

router.use('/accounts', require('./storeRoute'));

module.exports = router;