const express = require('express');
const router = express.Router();

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
 *             - COMPLETED
 *             - CANCELED
 *             - NOSHOW
 *         description: 예약 상태 필터
 *     responses:
 *       200:
 *         description: 예약 목록 조회 성공
 */
router.get('/', async (req, res, next) => {
    try {
        const { status } = req.query;

        const mockReservations = [
            {
                reservationId: 12,
                customerName: '홍길동',
                customerPhone: '010-1234-5678',
                productName: '크루아상',
                pickupTime: '19:30',
                status: 'CONFIRMED'
            }
        ];

        const filteredReservations = status
            ? mockReservations.filter(reservation => reservation.status === status)
            : mockReservations;

        res.status(200).json(filteredReservations);
    } catch (error) {
        next(error);
    }
});

module.exports = router;