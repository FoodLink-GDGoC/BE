/**
 * @swagger
 * tags:
 *   name: USER-items
 *   description: 유저 아이템
 */
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../../middlewares/authMiddleware');
const { getNearbyItems, getStoreItems } = require('../../controllers/user/itemController');

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

/**
 * @swagger
 * /api/user/items/stores/{storeId}:
 *   get:
 *     summary: 특정 매장 잔여 아이템 목록 조회
 *     description: 특정 매장의 아이템 목록을 조회합니다.
 *     tags: [USER-items]
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: 아이템 목록 조회 성공
 *       403:
 *         description: 인증되지 않은 매장
 *       404:
 *         description: 존재하지 않는 매장
 */
router.get('/stores/:storeId', verifyAccessToken, getStoreItems);

module.exports = router;