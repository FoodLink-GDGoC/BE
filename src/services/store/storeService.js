const { Store } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async ({ storeName, ownerName, email, address, lat, lng, storeNumber, password1, password2, imageUrl }) => {
  const requiredFields = { storeName, ownerName, email, address, storeNumber, password1, password2, imageUrl };
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

  if (password1.length < 8) {
    const err = new Error('비밀번호는 8자 이상이어야 해요.');
    err.code = 'PASSWORD_TOO_SHORT';
    err.status = 400;
    throw err;
  }

  if (password1 !== password2) {
    const err = new Error('비밀번호가 일치하지 않아요.');
    err.code = 'PASSWORD_MISMATCH';
    err.status = 400;
    throw err;
  }

  const numberExisting = await Store.findOne({ where: { storeNumber } });
  if (numberExisting) {
    const err = new Error('이미 사용 중인 전화번호예요.');
    err.code = 'DUPLICATE_STORE_NUMBER';
    err.status = 409;
    throw err;
  }

  const emailExisting = await Store.findOne({ where: { email } });
  if (emailExisting) {
    const err = new Error('이미 사용 중인 이메일이에요.');
    err.code = 'DUPLICATE_EMAIL';
    err.status = 409;
    throw err;
  }

  const hashed = await bcrypt.hash(password1, 10);
  return await Store.create({ storeName, ownerName, email, address, lat, lng, storeNumber, imageUrl, password: hashed });
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

  const storeEmail = await Store.findOne({ where: { email } });
  if (!storeEmail) {
    const err = new Error('가입되지 않은 이메일이에요.');
    err.code = 'STORE_NOT_FOUND';
    err.status = 404;
    throw err;
  }

  const store = await Store.findOne({ where: { email } });
  if (!store.is_verified) {
    const err = new Error('매장 인증이 완료되지 않았어요. 승인 후 로그인할 수 있어요.');
    err.code = 'STORE_NOT_VERIFIED';
    err.status = 403;
    throw err;
  }

  const match = await bcrypt.compare(password, store.password);
  if (!match) {
    const err = new Error('이메일 또는 비밀번호가 올바르지 않아요.');
    err.code = 'INVALID_CREDENTIALS';
    err.status = 401;
    throw err;
  }

  const accessToken = jwt.sign(
    { storeId: store.storeId, email: store.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h' }
  );
  const refreshToken = jwt.sign(
    { storeId: store.storeId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken, store };
};

module.exports = { signup, login };