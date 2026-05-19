/**
 * @swagger
 * tags:
 *   name: USER-accounts
 *   description: 유저 accounts
 */
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../../middlewares/authMiddleware');
const { signup, login } = require('../../controllers/user/userController');

/**
 * @swagger
 * /api/user/accounts/signup:
 *   post:
 *     summary: 일반 유저 회원가입
 *     description: 일반 유저가 회원가입 합니다.
 *     tags: [USER-accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *               - email
 *               - password
 *               - passwordConfirm
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: 홍길동
 *               email:
 *                 type: string
 *                 example: hong@example.com
 *               password:
 *                 type: string
 *                 example: password1234
 *               passwordConfirm:
 *                 type: string
 *                 example: password1234
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 회원가입이 완료됐어요.
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     nickname:
 *                       type: string
 *                       example: 홍길동
 *                     point:
 *                       type: integer
 *                       example: 0
 *                     createdAt:
 *                       type: string
 *                       example: 2026-05-18T09:41:00.000Z
 *       400:
 *         description: 필수 필드 누락 / 비밀번호 불일치 / 비밀번호 8자 미만
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 필수 항목을 입력해 주세요.
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: MISSING_FIELDS
 *       409:
 *         description: 이메일 중복
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 이미 사용 중인 이메일이에요.
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: DUPLICATE_EMAIL
 *                     field:
 *                       type: string
 *                       example: email
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/user/accounts/login:
 *   post:
 *     summary: 일반 유저 로그인
 *     description: 일반 유저가 로그인 합니다.
 *     tags: [USER-accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: son@foodlink.kr
 *               password:
 *                 type: string
 *                 example: password1234
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: integer
 *                           example: 1
 *                         nickname:
 *                           type: string
 *                           example: 손정민
 *                         email:
 *                           type: string
 *                           example: son@foodlink.kr
 *                         point:
 *                           type: integer
 *                           example: 1250
 *       400:
 *         description: 필드 누락
 *       401:
 *         description: 이메일/비밀번호 불일치
 *       404:
 *         description: 존재하지 않는 계정
 */
router.post('/login', login);


module.exports = router;