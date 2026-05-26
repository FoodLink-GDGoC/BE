const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/store/item/add:
 *   post:
 *     summary: 상품 등록
 *     description: 점주가 마감 직전의 할인 상품을 등록합니다.
 *     tags:
 *       - STORE-products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *               - price
 *               - type
 *               - pickupStart
 *               - pickupEnd
 *             properties:
 *               name:
 *                 type: string
 *                 example: 크루아상
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: integer
 *                 example: 0
 *               type:
 *                 type: string
 *                 example: GIVE
 *               pickupStart:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-05-18T17:00:00.000Z
 *               pickupEnd:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-05-18T19:00:00.000Z
 *               image:
 *                 type: string
 *                 example: https://cdn.foodlink.kr/items/croissant.jpg
 *     responses:
 *       201:
 *         description: 상품 등록 성공
 *       400:
 *         description: 필수 입력값 누락
 */
router.post('/', async (req, res, next) => {
    try {
        const { name, quantity, price, type, pickupStart, pickupEnd, image } = req.body;

        const missingFields = [];

        if (!name) missingFields.push('name');
        if (quantity === undefined) missingFields.push('quantity');
        if (price === undefined) missingFields.push('price');
        if (!type) missingFields.push('type');
        if (!pickupStart) missingFields.push('pickupStart');
        if (!pickupEnd) missingFields.push('pickupEnd');

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: '필수 입력값이 누락되었습니다.',
                missingFields
            });
        }

        res.status(201).json({
            success: true,
            message: '상품이 정상적으로 등록되었습니다.',
            data: {
                name,
                quantity,
                price,
                type,
                pickupStart,
                pickupEnd,
                image
            }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;