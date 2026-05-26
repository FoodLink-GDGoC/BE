const express = require('express');
const router = express.Router();

router.use('/accounts', require('./storeRoute'));
router.use('/item', require('./productRegisterRouter'));
router.use('/reservations', require('./reservationRouter'));


module.exports = router;