const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: '토큰이 없어요.',
      error: { code: 'NO_TOKEN' },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '유효하지 않은 토큰이에요.',
      error: { code: 'INVALID_TOKEN' },
    });
  }
};

module.exports = { verifyAccessToken };