const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async ({ nickname, email, password, passwordConfirm }) => {
  const requiredFields = { nickname, email, password, passwordConfirm };
  const missingFields = Object.entries(requiredFields)
    .filter(([_, v]) => !v)
    .map(([k]) => k);

  if (missingFields.length > 0) {
    const err = new Error('필수 항목을 입력해 주세요.');
    err.code = 'MISSING_FIELDS';
    err.fields = missingFields;
    err.status = 400;
    throw err;
  }

  if (password.length < 8) {
    const err = new Error('비밀번호는 8자 이상이어야 해요.');
    err.code = 'PASSWORD_TOO_SHORT';
    err.status = 400;
    throw err;
  }

  if (password !== passwordConfirm) {
    const err = new Error('비밀번호가 일치하지 않아요.');
    err.code = 'PASSWORD_MISMATCH';
    err.status = 400;
    throw err;
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    const err = new Error('이미 사용 중인 이메일이에요.');
    err.code = 'DUPLICATE_EMAIL';
    err.status = 409;
    throw err;
  }

  const hashed = await bcrypt.hash(password, 10);
  return await User.create({ nickname, email, password: hashed, point: 0 });
};

const login = async ({ email, password }) => {
  const requiredFields = { email, password };
  const missingFields = Object.entries(requiredFields)
    .filter(([_, v]) => !v)
    .map(([k]) => k);

  if (missingFields.length > 0) {
    const err = new Error('이메일과 비밀번호를 모두 입력해 주세요.');
    err.code = 'MISSING_FIELDS';
    err.fields = missingFields;
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err = new Error('가입되지 않은 이메일이에요.');
    err.code = 'USER_NOT_FOUND';
    err.status = 404;
    throw err;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const err = new Error('이메일 또는 비밀번호가 올바르지 않아요.');
    err.code = 'INVALID_CREDENTIALS';
    err.status = 401;
    throw err;
  }

  const accessToken = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h' }
  );
  const refreshToken = jwt.sign(
    { userId: user.userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken, user };
};

module.exports = { signup, login };