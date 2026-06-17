import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';
import { isValidEmail } from './validator.js';
import { normalizeEmail } from './utils.js';

/** scrypt 파라미터 (N=16384, r=8, p=1) */
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

/** @type {Map<string, { salt: Buffer, hash: Buffer }>} */
const users = new Map();

/**
 * 비밀번호를 scrypt로 해시한다.
 * @param {string} password - 평문 비밀번호
 * @param {Buffer} salt - 솔트
 * @returns {Buffer} 해시
 */
function hashPassword(password, salt) {
  return scryptSync(password, salt, 64, SCRYPT_OPTIONS);
}

/**
 * 저장된 해시와 입력 비밀번호를 타이밍 안전하게 비교한다.
 * @param {string} password - 입력 비밀번호
 * @param {Buffer} salt - 저장된 솔트
 * @param {Buffer} storedHash - 저장된 해시
 * @returns {boolean}
 */
function verifyPassword(password, salt, storedHash) {
  const hash = hashPassword(password, salt);
  if (hash.length !== storedHash.length) {
    return false;
  }
  return timingSafeEqual(hash, storedHash);
}

/**
 * 사용자를 등록하고 비밀번호를 해시해 저장한다.
 * @param {string} email - 등록 이메일
 * @param {string} password - 평문 비밀번호
 * @returns {{ success: boolean, error?: string }}
 */
export function registerUser(email, password) {
  if (!isValidEmail(email)) {
    return { success: false, error: '유효하지 않은 이메일 형식입니다.' };
  }
  if (typeof password !== 'string' || password.length === 0) {
    return { success: false, error: '비밀번호를 입력해 주세요.' };
  }

  const normalized = normalizeEmail(email);
  const salt = randomBytes(16);
  const hash = hashPassword(password, salt);
  users.set(normalized, { salt, hash });

  return { success: true };
}

/**
 * 이메일과 비밀번호로 로그인을 시도한다.
 * @param {string} email - 로그인 이메일
 * @param {string} password - 비밀번호
 * @returns {{ success: boolean, error?: string }}
 */
export function login(email, password) {
  if (!isValidEmail(email)) {
    return { success: false, error: '유효하지 않은 이메일 형식입니다.' };
  }
  if (typeof password !== 'string' || password.length === 0) {
    return { success: false, error: '비밀번호를 입력해 주세요.' };
  }

  const normalized = normalizeEmail(email);
  const record = users.get(normalized);

  if (!record || !verifyPassword(password, record.salt, record.hash)) {
    return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }

  return { success: true };
}

// README 예시용 데모 계정
registerUser('alice@example.com', 'secret');
