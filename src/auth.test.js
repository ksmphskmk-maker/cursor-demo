import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { login, registerUser } from './auth.js';

describe('login', () => {
  it('등록된 사용자로 로그인에 성공한다', () => {
    assert.deepEqual(login('alice@example.com', 'secret'), { success: true });
  });

  it('잘못된 비밀번호면 실패한다', () => {
    const result = login('alice@example.com', 'wrong-password');
    assert.equal(result.success, false);
    assert.equal(result.error, '이메일 또는 비밀번호가 올바르지 않습니다.');
  });

  it('등록되지 않은 이메일이면 실패한다', () => {
    const result = login('nobody@example.com', 'secret');
    assert.equal(result.success, false);
    assert.equal(result.error, '이메일 또는 비밀번호가 올바르지 않습니다.');
  });

  it('유효하지 않은 이메일 형식이면 실패한다', () => {
    const result = login('invalid', 'secret');
    assert.equal(result.success, false);
    assert.equal(result.error, '유효하지 않은 이메일 형식입니다.');
  });

  it('비밀번호가 비어 있으면 실패한다', () => {
    const result = login('alice@example.com', '');
    assert.equal(result.success, false);
    assert.equal(result.error, '비밀번호를 입력해 주세요.');
  });
});

describe('registerUser', () => {
  it('새 사용자를 등록하고 로그인할 수 있다', () => {
    const email = 'newuser@example.com';
    assert.deepEqual(registerUser(email, 'mypassword'), { success: true });
    assert.deepEqual(login(email, 'mypassword'), { success: true });
  });
});
