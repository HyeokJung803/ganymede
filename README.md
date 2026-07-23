# GANYMEDE

**GANYMEDE**는 럭셔리 패션 쇼핑몰을 콘셉트로 제작한 웹 프로젝트입니다.

프론트엔드는 **React + Vite**, 백엔드는 **Spring Boot**, 데이터베이스는 **MySQL**을 기반으로 구성했습니다.

---

# AI 활용 방식

이 프로젝트는 AI 도구를 역할에 맞게 활용하여 개발했습니다.

| AI Tool | 활용 내용 |
|---------|-----------|
| **ChatGPT** | 프로젝트 기획, 상품 이미지 및 모델 착용 이미지 생성, 로고 제작, 문서 작성 |
| **Codex AI Agent** | React 및 Spring Boot 기능 구현 |
| **V0** | UI/UX 레이아웃 및 디자인 방향 참고 |

---

# 개발 방식

프로젝트는 **Ponytail 스타일**을 참고하여 진행했습니다.

Ponytail GitHub  
https://github.com/DietrichGebert/ponytail

Ponytail 스타일은

- 필요한 기능만 구현
- 기존 구조 최대한 재사용
- 불필요한 추상화 최소화
- 파일 생성 최소화

를 목표로 하는 개발 방식입니다.

GANYMEDE 프로젝트에서는 다음과 같은 효과를 체감했습니다.

- 작업 시간 약 **25% 절약**
- 불필요한 파일 증가 약 **30% 감소**
- 헛기능 구현 약 **40% 감소**

특히

- 상품 추가
- 로고 변경
- 다국어(한글/영어) 전환
- 불필요한 파일 정리

작업에서 효율이 높았습니다.

---

# 웹 화면

## Codex 구현 화면

Codex는 실제 프로젝트 안에서 기능과 데이터를 연결하는 역할을 수행했습니다.

구현 기능

- 상품 목록
- 상품 상세
- 장바구니
- 로그인
- 회원가입
- 계정 페이지
- 다국어 전환
- UI 인터랙션

또한 프로젝트에서 사용된 **상품 이미지와 모델 착용 이미지는 ChatGPT 이미지 생성 기능을 활용하여 제작**했습니다.

<img width="1905" height="910" alt="Codex web view 1" src="https://github.com/user-attachments/assets/e58e3250-67e6-45e1-a5e0-4b7ed989a048" />

<img width="1902" height="834" alt="Codex web view 2" src="https://github.com/user-attachments/assets/7198193c-e3c6-4023-984c-f13f3e518f18" />

<img width="1913" height="906" alt="Codex web view 3" src="https://github.com/user-attachments/assets/ce527850-ed32-42b0-8aa0-b6853a473e25" />

---

## V0 디자인 참고 화면

V0는 실제 프로젝트를 구현한 것이 아니라,

- 전체 레이아웃
- 럭셔리 쇼핑몰 분위기
- 화면 구성
- 디자인 방향

을 참고하기 위해 활용했습니다.

<img width="1918" height="912" alt="V0 web view 1" src="https://github.com/user-attachments/assets/85814f5b-5958-442b-9463-f90504e8096b" />

<img width="1912" height="902" alt="V0 web view 2" src="https://github.com/user-attachments/assets/e1003220-69cf-4148-bc04-4ff13f99bc4c" />

<img width="1915" height="907" alt="V0 web view 3" src="https://github.com/user-attachments/assets/1a11b195-eb79-4cd7-92e0-80e1f5fe62a3" />

---

# 프로젝트 구조

```text
GANYMEDE/
├── frontend/     # React + Vite
├── backend/      # Spring Boot REST API
└── database/     # MySQL Schema & Seed
```

---

# 실행 방법

## Backend

```bash
cd backend
mvn spring-boot:run
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

실행 후 브라우저에서 Vite가 안내하는 주소로 접속합니다.

---

# 주요 기능

- 상품 목록
- 상품 상세 페이지
- 장바구니
- 로그인 / 회원가입
- 계정 페이지
- 한글 / 영어 전환
- 반응형 UI
- GANYMEDE 브랜드 로고 적용
- MySQL 연동
- Spring Boot REST API 연동

---

# Tech Stack

### Frontend

- React
- Vite

### Backend

- Spring Boot

### Database

- MySQL

### AI

- ChatGPT
- Codex AI Agent
- V0

---

# 프로젝트 정리

**GANYMEDE**는 럭셔리 패션 쇼핑몰을 목표로 제작한 풀스택 웹 프로젝트입니다.

프로젝트에서는

- **ChatGPT**를 활용해 기획, 상품 이미지, 모델 착용 이미지, 로고 및 문서를 제작하고,
- **Codex AI Agent**를 통해 React와 Spring Boot 기반의 실제 기능을 구현했으며,
- **V0**를 활용해 UI/UX 방향을 설계했습니다.

또한 **Ponytail 스타일**을 적용하여 기존 구조를 최대한 재사용하고 불필요한 코드와 파일 생성을 줄이며 필요한 기능 중심으로 프로젝트를 완성했습니다.
