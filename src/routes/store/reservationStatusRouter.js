const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/store/reservations/{reservationId}/pickup:
 *   patch:
 *     summary: 픽업 완료 처리
 *     description: 점주가 예약 상품의 픽업 완료 상태를 처리합니다.
 *     tags:
 *       - STORE-reserve
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
 */
router.patch('/:reservationId/pickup', async (req, res, next) => {
    try {
        const { reservationId } = req.params;

        const existingReservationIds = [1, 2, 3];

        if (!existingReservationIds.includes(Number(reservationId))) {
            return res.status(404).json({
                success: false,
                message: '존재하지 않는 예약입니다.'
            });
        }

        res.status(200).json({
            success: true,
            message: `예약 번호 ${reservationId}번이 픽업 완료 처리되었습니다.`
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;