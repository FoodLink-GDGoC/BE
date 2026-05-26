const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');

/**
 * @swagger
 * /api/store/reservations:
 *   get:
 *     summary: 예약 목록 조회
 *     description: 점주가 매장에 들어온 예약 목록을 상태별로 조회합니다.
 *     tags:
 *       - STORE-reserve
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - CONFIRMED
 *             - PICKUP
 *             - NOSHOW
 *             - CANCEL
 *             - EXPIRED
 *         description: 예약 상태 필터
 *     responses:
 *       200:
 *         description: 예약 목록 조회 성공
 */
router.get('/', reservationController.getReservations);

module.exports = router;