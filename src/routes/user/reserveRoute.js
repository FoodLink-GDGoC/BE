/**
 * @swagger
 * tags:
 *   name: USER-reserve
 *   description: 유저 예약
 */
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../../middlewares/authMiddleware');
const { getItemDetail, createReservation } = require('../../controllers/user/reserveController');

/**
 * @swagger
 * /api/user/reserve/items/{itemId}:
 *   get:
 *     summary: 아이템 예약 수량 선택
 *     description: 특정 아이템 상세 정보를 조회합니다.
 *     tags: [USER-reserve]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: 아이템 상세 조회 성공
 *       400:
 *         description: 마감된 상품
 *       404:
 *         description: 존재하지 않는 상품
 */
router.get('/items/:itemId', verifyAccessToken, getItemDetail);

/**
 * @swagger
 * /api/user/reserve/items/{itemId}:
 *   post:
 *     summary: 예약하기
 *     description: 아이템을 예약합니다. 로그인 필요.
 *     tags: [USER-reserve]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: 예약 성공
 *       400:
 *         description: 수량 오류 / 마감된 상품
 *       401:
 *         description: 비로그인
 *       409:
 *         description: 중복 예약
 */
router.post('/items/:itemId', verifyAccessToken, createReservation);



module.exports = router;