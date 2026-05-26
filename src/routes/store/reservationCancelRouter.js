const express = require('express');
const router = express.Router();

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
router.patch('/:reservationId/cancel', async (req, res, next) => {
    try {
        const { reservationId } = req.params;

        const existingReservationIds = [1, 2, 3];

        if (!existingReservationIds.includes(Number(reservationId))) {
            return res.status(404).json({
                success: false,
                message: '존재하지 않는 예약입니다.'
            });
        }

        if (Number(reservationId) === 2) {
            return res.status(400).json({
                success: false,
                message: '이미 취소된 예약입니다.'
            });
        }

        res.status(200).json({
            success: true,
            message: `예약 번호 ${reservationId}번이 성공적으로 취소되었습니다.`
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;