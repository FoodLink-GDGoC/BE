const storeService = require('../../services/store/storeService');

exports.signup = async (req, res) => {
  try {
    const store = await storeService.signup(req.body);
    res.status(201).json({
      success: true,
      message: '매장 회원가입이 완료됐어요. 인증 검토 후 승인됩니다.',
      data: {
        storeId: store.storeId,
        storeName: store.storeName,
        ownerName: store.ownerName,
        email: store.email,
        address: store.address,
        lat: store.lat,
        lng: store.lng,
        storeNumber: store.storeNumber,
        is_verified:store.is_verified,
        createdAt: store.createdAt,
        verifiedImageId: store.verifiedImageId,
        imageUrl: store.imageUrl,
      },
    });
  } catch (err) {
    if (err.code === 'MISSING_FIELDS') {
      return res.status(400).json({
        success: false,
        message: err.message,
        error: { code: err.code, fields: err.fields },
      });
    }
    if (err.code === 'DUPLICATE_STORE_NUMBER') {
      return res.status(409).json({
        success: false,
        message: err.message,
        error: { code: err.code, field: 'storeNumber' },
      });
    }
    if (err.code === 'DUPLICATE_EMAIL') {
      return res.status(409).json({
        success: false,
        message: err.message,
        error: { code: err.code, field: 'email' },
      });
    }
    res.status(err.status || 400).json({
      success: false,
      message: err.message,
      error: { code: err.code },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { accessToken, refreshToken, store } = await storeService.login(req.body);
    res.status(200).json({
      success: true,
      message: '로그인 성공',
      data: {
        accessToken,
        refreshToken,
        store: {
          storeId: store.storeId,
          storeName: store.storeName,
          ownerName: store.ownerName,
          email: store.email,
          is_verified: store.is_verified,
        },
      },
    });
  } catch (err) {
    if (err.code === 'MISSING_FIELDS') {
      return res.status(400).json({
        success: false,
        message: err.message,
        error: { code: err.code, fields: err.fields },
      });
    }
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
      error: { code: err.code },
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: '로그아웃 됐어요.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '로그아웃 중 오류가 발생했어요.',
      error: {},
    });
  }
};