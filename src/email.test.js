import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractEmails, getValidEmails } from './email.js';

describe('extractEmails', () => {
  it('사용자 배열에서 email 필드를 추출한다', () => {
    const users = [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ];
    assert.deepEqual(extractEmails(users), ['alice@example.com', 'bob@example.com']);
  });

  it('배열이 아니면 빈 배열을 반환한다', () => {
    assert.deepEqual(extractEmails(null), []);
    assert.deepEqual(extractEmails(undefined), []);
  });
});

describe('getValidEmails', () => {
  it('유효한 이메일만 반환한다', () => {
    const users = [
      { email: 'alice@example.com' },
      { email: 'invalid-email' },
      { email: 'bob@example.com' },
      { email: '' },
    ];
    assert.deepEqual(getValidEmails(users), ['alice@example.com', 'bob@example.com']);
  });

  it('배열이 아니면 빈 배열을 반환한다', () => {
    assert.deepEqual(getValidEmails(null), []);
  });
});
