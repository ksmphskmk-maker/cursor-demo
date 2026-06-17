# cursor-demo

이메일 검증·추출·인증 기능을 제공하는 Node.js 데모 프로젝트입니다.  
외부 npm 패키지 없이 RFC 5322 기반 이메일 검증을 직접 구현합니다.

## 주요 기능

| 모듈 | 설명 |
|------|------|
| `validator.js` | RFC 5322 형식 및 RFC 3696 길이 제한 검증 |
| `email.js` | 사용자 배열에서 이메일 추출·필터링·중복 제거 |
| `auth.js` | 이메일·비밀번호 형식 검증 로그인 |
| `utils.js` | 이메일 정규화 (trim, 소문자 변환) |

## 요구 사항

- Node.js 18 이상 (내장 `node:test` 사용)

## 설치 및 실행

```bash
# 의존성 설치 (외부 패키지 없음)
npm install

# 엔트리 포인트 실행
node src/index.js
```

## 테스트

```bash
npm test
```

## 프로젝트 구조

```
cursor-demo/
├── src/
│   ├── index.js        # 엔트리 포인트
│   ├── validator.js    # 이메일 형식 검증
│   ├── email.js        # 이메일 추출·필터링
│   ├── email.test.js   # 테스트
│   ├── auth.js         # 로그인 검증
│   └── utils.js        # 이메일 정규화
├── docs/
│   └── validator.md    # validator.js 스펙 문서
└── package.json
```

## API 요약

### `isValidEmail(email)`

이메일 문자열이 유효한지 검증합니다.

```js
import { isValidEmail } from './src/validator.js';

isValidEmail('alice@example.com'); // true
isValidEmail('invalid-email');       // false
```

### `getValidEmails(users)`

사용자 배열에서 유효한 이메일만 반환합니다.

```js
import { getValidEmails } from './src/email.js';

const users = [
  { email: 'alice@example.com' },
  { email: 'invalid-email' },
];
getValidEmails(users); // ['alice@example.com']
```

### `login(email, password)`

이메일·비밀번호 형식을 검증합니다.

```js
import { login } from './src/auth.js';

login('alice@example.com', 'secret');
// { success: true }

login('invalid', '');
// { success: false, error: '유효하지 않은 이메일 형식입니다.' }
```

### `normalizeEmail(email)`

이메일을 비교·저장용으로 정규화합니다.

```js
import { normalizeEmail } from './src/utils.js';

normalizeEmail('  Alice@Example.COM  '); // 'alice@example.com'
```

## 스펙 문서

`validator.js`의 상세 스펙과 리팩터링 규칙은 [docs/validator.md](docs/validator.md)를 참고하세요.

## 릴리스 노트

### v1.0.0

외부 패키지 없이 RFC 5322 기반 이메일 검증·추출·인증 기능을 제공하는 첫 정식 릴리스입니다.

#### ✨ 기능

- **`isValidEmail`** — RFC 5322 형식 검증 및 RFC 3696 길이 제한(로컬 파트 64자, 전체 254자) 적용
- **IP 리터럴 검증 개선** — IPv4 옥텟에서 `00` 등 불법 값 거부
- **`email.js`** — 사용자 배열에서 이메일 추출(`extractEmails`), 유효 이메일 필터링(`getValidEmails`), 중복 제거(`uniqueValidEmails`)
- **`auth.js`** — 이메일·비밀번호 형식 검증 로그인(`login`)
- **`utils.js`** — 이메일 정규화(`normalizeEmail`: trim, 소문자 변환)
- **테스트** — Node.js 내장 `node:test`로 `extractEmails`, `getValidEmails` 검증 (`npm test`)
- **문서** — `docs/validator.md` 스펙 문서 및 `README.md`(설치, API 사용법, 프로젝트 구조)

#### 🐛 버그 수정

- 해당 없음

#### 🧹 기타

- ES Module(`"type": "module"`) 프로젝트 구조 및 엔트리 포인트(`src/index.js`) 구성
- 외부 npm 의존성 없음 (Node.js 18+)

## 라이선스

ISC
