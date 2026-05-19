const userService = require('../../services/user/userService');

exports.signup = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({
      success: true,
      message: '회원가입이 완료됐어요.',
      data: {
        userId: user.userId,
        nickname: user.nickname,
        point: user.point,
        createdAt: user.createdAt,
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
    const { accessToken, refreshToken, user } = await userService.login(req.body);
    res.status(200).json({
      success: true,
      message: '로그인 성공',
      data: {
        accessToken,
        refreshToken,
        user: {
          userId: user.userId,
          nickname: user.nickname,
          email: user.email,
          point: user.point,
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