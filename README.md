# GANY

GANY는 가상의 명품 온라인 스토어 프로젝트입니다. Spring Boot, React, MySQL, JPA, Spring Security, JWT를 사용합니다.

전체적인 분위기는 하이엔드 패션 리테일 사이트에서 영감을 받았지만, 실제 브랜드의 로고, 상품명, 이미지, 문구, 디자인을 복제하지 않는 독창적인 포트폴리오용 쇼핑몰입니다.

## 프로젝트 구조

- `backend/`: Spring Boot REST API
- `frontend/`: React + Vite 스토어 화면
- `database/`: MySQL 스키마와 시드 SQL

## 필요 환경

- Java 11
- Maven
- Node.js
- MySQL 8 이상

## MySQL 설정

먼저 MySQL에서 데이터베이스를 생성합니다.

```sql
CREATE DATABASE ganymede_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

그 다음 [application.yml](backend/src/main/resources/application.yml)의 DB 계정 정보를 본인 환경에 맞게 수정합니다.

```yaml
spring:
  datasource:
    username: root
    password: your_password
```

백엔드를 처음 실행하면 샘플 상품 데이터가 자동으로 생성됩니다. 직접 SQL로 넣고 싶다면 `database/schema.sql`, `database/seed.sql`을 실행하면 됩니다.

## 실행 방법

백엔드 실행:

```bash
cd backend
mvn spring-boot:run
```

프론트엔드 실행:

```bash
cd frontend
npm.cmd install
npm.cmd run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

PowerShell에서 `npm install`이 실행 정책 오류로 막히면 `npm.cmd install`을 사용하면 됩니다.

## 주요 기능

- 회원가입
- 로그인
- JWT 기반 인증
- 상품 목록 조회
- 상품 상세 조회
- 카테고리 필터
- 상품 검색
- 장바구니 추가, 조회, 수정, 삭제
- 주문 생성
- 주문 목록 조회
- 반응형 명품 쇼핑몰 UI

## 주요 API

- `POST /api/auth/register`: 회원가입
- `POST /api/auth/login`: 로그인
- `GET /api/auth/me`: 내 정보 조회
- `GET /api/products`: 상품 전체 조회
- `GET /api/products?category=BAGS`: 카테고리별 상품 조회
- `GET /api/products?search=bag`: 상품 검색
- `GET /api/products/{id}`: 상품 상세 조회
- `GET /api/cart`: 장바구니 조회
- `POST /api/cart`: 장바구니 추가
- `PUT /api/cart/{id}`: 장바구니 수량 변경
- `DELETE /api/cart/{id}`: 장바구니 삭제
- `POST /api/orders`: 주문 생성
- `GET /api/orders`: 주문 목록 조회
- `GET /api/orders/{id}`: 주문 상세 조회

## 이미지 생성 프롬프트

Nano Banana 또는 다른 이미지 생성 AI에 아래 프롬프트를 넣어 상품 이미지를 만들 수 있습니다.

생성한 이미지는 `frontend/public/images/products/` 아래에 넣고, 파일명이 바뀌면 DB의 `thumbnail_url` 또는 백엔드 시드 데이터의 이미지 경로를 수정하면 됩니다.

```text
Create a cohesive set of luxury fashion e-commerce product images for a fictional high-end brand called GANY.

Do not include real brand logos, trademarks, text, monograms, or recognizable brand patterns. Do not imitate Prada, Gucci, Hermes, Chanel, Louis Vuitton, or any existing brand directly.

Style: minimal luxury editorial product photography, ivory studio background, warm natural lighting, premium material texture, elegant composition, clean shadows, high-end catalog aesthetic, ultra realistic, 4k.

Products:
1. Black structured leather tote bag
2. Deep green mini leather handbag
3. Ivory silk scarf with subtle abstract pattern
4. Black leather loafers with minimal gold detail
5. Camel wool long coat on mannequin
6. Minimal gold bracelet
7. Burgundy leather compact wallet
8. Cream cashmere knit sweater

Composition: centered product, clean background, no human face, no text, no logo, consistent lighting, luxury e-commerce product photo.
```

## 현재 구현 범위

현재 구현됨:

- 사용자
- JWT 로그인
- 상품
- 장바구니
- 주문
- 반응형 프론트엔드 화면
- 샘플 상품 데이터

추후 추가하면 좋은 기능:

- 실제 결제 연동
- 관리자 상품 등록/수정 화면
- 위시리스트
- 리뷰
- 쿠폰
- 배송 상태 관리
