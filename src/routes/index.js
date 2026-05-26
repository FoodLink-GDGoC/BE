const express = require('express');
const router = express.Router();

// ==========================================
// 1. 기존 시스템 라우터 연결
// ==========================================
router.use('/health', require('./health'));
router.use('/user', require('./user'));
router.use('/store', require('./store')); // 기존 store 폴더의 메인 연결

// ==========================================
// 2. 푸드링크 신규 API 라우터 연결 (store 폴더 내부를 바라보도록 설정)
// ==========================================
// 최종 주소 예시: [POST] http://localhost:3000/api/products/register
router.use('/products/register', require('./store/productRegisterRouter'));
router.use('/reservations/list', require('./store/reservationListRouter'));
router.use('/reservations/cancel', require('./store/reservationCancelRouter'));
router.use('/reservations/status', require('./store/reservationStatusRouter'));

module.exports = router;