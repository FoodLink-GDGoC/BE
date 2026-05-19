const express = require('express');
const router = express.Router();

router.use('/accounts', require('./userRoute'));
router.use('/items', require('./itemRoute'));
router.use('/reserve', require('./reserveRoute'));

module.exports = router;