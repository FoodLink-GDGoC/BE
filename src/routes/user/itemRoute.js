/**
 * @swagger
 * tags:
 *   name: USER-items
 *   description: 유저 아이템
 */
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../../middlewares/authMiddleware');
const { getNearbyItems } = require('../../controllers/user/itemController');

/**
 * @swagger
 * /api/user/items/nearby:
 *   get:
 *     summary: 주변 매장 아이템 조회
 *     description: 현재 위치 기준 반경 내 ACTIVE 아이템을 거리순으로 반환합니다.
 *     tags: [USER-items]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: 현재 위치 위도
 *         example: 37.5563
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *         description: 현재 위치 경도
 *         example: 126.924
 *       - in: query
 *         name: radius
 *         required: false
 *         schema:
 *           type: number
 *         description: 검색 반경 (미터, 기본값 500)
 *         example: 5000
 *     responses:
 *       200:
 *         description: 주변 매장 조회 성공
 *       400:
 *         description: 위치 정보 누락 또는 잘못된 좌표
 */
router.get('/nearby', verifyAccessToken, getNearbyItems);

module.exports = router;