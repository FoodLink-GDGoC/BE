/**
 * @swagger
 * tags:
 *   name: Health
 *   description: 서버 상태 확인
 */

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: 서버 상태 확인
 *     description: 서버가 정상적으로 동작하는지 확인합니다.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: 서버 정상
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *       500:
 *         description: 서버 내부 오류
 */
router.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;