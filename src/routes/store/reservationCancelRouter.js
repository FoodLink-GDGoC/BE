const express = require('express');
const router = express.Router();

const reservationController = require('../../controllers/store/reservationController');

/**
 * @swagger
 * /api/user/reservations/{reservationId}/cancel:
 *   patch:
 *     summary: 예약 취소 요청
 *     description: 소비자가 예약을 취소하고 상품을 다시 활성화합니다.
 *     tags:
 *       - USER-reserve
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
router.patch('/:reservationId/cancel', reservationController.cancelReservation);

module.exports = router;