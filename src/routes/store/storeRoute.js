/**
 * @swagger
 * tags:
 *   name: STORE-accounts
 *   description: 매장 accounts
 */
const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../../middlewares/authMiddleware');
const { signup, login } = require('../../controllers/store/storeController');

/**
 * @swagger
 * /api/store/accounts/signup:
 *   post:
 *     summary: 매장 회원가입
 *     tags: [STORE-accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - storeName
 *               - ownerName
 *               - email
 *               - address
 *               - lat
 *               - lng
 *               - storeNumber
 *               - password1
 *               - password2
 *               - imageUrl
 *             properties:
 *               storeName:
 *                 type: string
 *                 example: 초록마트 망원점
 *               ownerName:
 *                 type: string
 *                 example: 김민준
 *               email:
 *                 type: string
 *                 example: 이메일
 *               address:
 *                 type: string
 *                 example: 서울 마포구 망원동 123-4
 *               lat:
 *                 type: number
 *                 example: 37.5563
 *               lng:
 *                 type: number
 *                 example: 126.9107
 *               storeNumber:
 *                 type: string
 *                 example: 02-1234-5678
 *               password1:
 *                 type: string
 *                 example: password1
 *               password2:
 *                 type: string
 *                 example: password2
 *               imageUrl:
 *                 type: string
 *                 example: https://cdn.foodlink.kr/store/verified/abc123.jpg
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
 *                   example: 매장 회원가입이 완료됐어요. 인증 검토 후 승인됩니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     storeId:
 *                       type: integer
 *                       example: 1
 *                     storeName:
 *                       type: string
 *                       example: 초록마트 망원점
 *                     ownerName:
 *                       type: string
 *                       example: 김민준
 *                     email:
 *                       type: string
 *                       example: 이메일
 *                     address:
 *                       type: string
 *                       example: 서울 마포구 망원동 123-4
 *                     lat:
 *                       type: number
 *                       example: 37.5563
 *                     lng:
 *                       type: number
 *                       example: 126.9107
 *                     storeNumber:
 *                       type: string
 *                       example: 02-1234-5678
 *                     is_verified:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       example: 2026-05-18T09:41:00.000Z
 *                     verifiedImageId:
 *                       type: integer
 *                       example: 1
 *                     imageUrl:
 *                       type: string
 *                       example: https://cdn.foodlink.kr/store/verified/abc123.jpg
 *       409:
 *         description: 중복 값 존재 (전화번호 또는 이메일)
 *         content:
 *           application/json:
 *             examples:
 *               duplicateStoreNumber:
 *                 summary: 전화번호 중복
 *                 value:
 *                   success: false
 *                   message: 이미 사용 중인 전화번호예요.
 *                   error:
 *                     code: DUPLICATE_STORE_NUMBER
 *                     field: storeNumber
 *               duplicateEmail:
 *                 summary: 이메일 중복
 *                 value:
 *                   success: false
 *                   message: 이미 사용 중인 이메일이에요.
 *                   error:
 *                     code: DUPLICATE_EMAIL
 *                     field: email
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/store/accounts/login:
 *   post:
 *     summary: 매장 로그인
 *     tags: [STORE-accounts]
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
 *                 example: kiminjun@foodlink.kr
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
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     refreshToken:
 *                       type: string
 *                       example: dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...
 *                     store:
 *                       type: object
 *                       properties:
 *                         storeId:
 *                           type: integer
 *                           example: 1
 *                         storeName:
 *                           type: string
 *                           example: 초록마트 망원점
 *                         ownerName:
 *                           type: string
 *                           example: 김민준
 *                         email:
 *                           type: string
 *                           example: 이메일
 *                         is_verified:
 *                           type: boolean
 *                           example: true
 *       400:
 *         description: 입력값 누락
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
 *                   example: 이메일과 비밀번호를 모두 입력해 주세요.
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: MISSING_FIELDS
 *                     fields:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["email", "password"]
 *       401:
 *         description: 이메일/비밀번호 불일치
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
 *                   example: 이메일 또는 비밀번호가 올바르지 않아요.
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: INVALID_CREDENTIALS
 *       403:
 *         description: 미인증 매장
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
 *                   example: 매장 인증이 완료되지 않았어요. 승인 후 로그인할 수 있어요.
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: STORE_NOT_VERIFIED
 */
router.post('/login', login);

// router.post('/logout', logout)

module.exports = router;