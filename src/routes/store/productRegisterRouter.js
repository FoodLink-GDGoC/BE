const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

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
 *                 enum:
 *                   - GIVE
 *                   - SELL
 *                 example: GIVE
 *               pickupStart:
 *                 type: string
 *                 example: 2026-05-18T17:00:00.000Z
 *               pickupEnd:
 *                 type: string
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
router.post('/', productController.registerProduct);

module.exports = router;