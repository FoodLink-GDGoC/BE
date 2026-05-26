/**
 * @swagger
 * tags:
 *   name: STORE-reservations
 *   description: 매장 reservations
 */
const express = require('express');
const router = express.Router();

const { verifyAccessToken } = require('../../middlewares/authMiddleware');
const { getReservations, cancelReservation, pickupReservation } = require('../../controllers/store/reservationController');

/**
 * @swagger
 * /api/store/reservations:
 *   get:
 *     summary: 예약 목록 조회
 *     description: 점주가 매장에 들어온 예약 목록을 상태별로 조회합니다.
 *     tags: [STORE-reservations]
 *     security:
 *       - Authorization: []
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
router.get('/', verifyAccessToken, getReservations);

/**
 * @swagger
 * /api/store/reservations/{reservationId}/cancel:
 *   patch:
 *     summary: 예약 취소 요청
 *     description: 점주가 예약을 취소하고 상품을 다시 활성화합니다.
 *     tags: [STORE-reservations]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 취소할 예약 번호
 *     responses:
 *       200:
 *         description: 예약 취소 성공
 *       400:
 *         description: 이미 취소된 예약
 *       404:
 *         description: 존재하지 않는 예약 번호
 */
router.patch('/:reservationId/cancel', verifyAccessToken, cancelReservation);

/**
 * @swagger
 * /api/store/reservations/{reservationId}/pickup:
 *   patch:
 *     summary: 픽업 완료 처리
 *     description: 점주가 예약 상품의 픽업 완료 상태를 처리합니다.
 *     tags: [STORE-reservations]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 픽업 완료 처리할 예약 번호
 *     responses:
 *       200:
 *         description: 픽업 완료 처리 성공
 *       400:
 *         description: 이미 처리된 예약
 *       404:
 *         description: 존재하지 않는 예약
 */
router.patch('/:reservationId/pickup', verifyAccessToken, pickupReservation);

module.exports = router;