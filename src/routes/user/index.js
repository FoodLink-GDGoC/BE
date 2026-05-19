const express = require('express');
const router = express.Router();

router.use('/accounts', require('./userRoute'));

module.exports = router;