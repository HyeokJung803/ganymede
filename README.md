# GANYMEDE

GANYMEDE는 럭셔리 패션 쇼핑몰 콘셉트의 웹 프로젝트입니다.  
React + Vite 프론트엔드, Spring Boot 백엔드, MySQL 시드 데이터를 사용합니다.

## 작업 방식

이 프로젝트는 **Codex AI Agent로 코딩**했습니다.

작업할 때는 **Ponytail 스타일**을 사용했습니다.  
Ponytail 스타일은 필요한 기능만 최소한으로 만들고, 이미 있는 구조를 재사용하며, 불필요한 추상화나 파일을 늘리지 않는 방식입니다.

이번 GANYMEDE 작업에서 Ponytail 스타일을 사용한 결과, 체감 효율은 대략 다음 정도였습니다.

- 작업 시간: 약 25% 절약
- 불필요한 파일 증가: 약 30% 감소
- 헛기능 방지: 약 40% 개선

특히 상품 추가, 로고 교체, 한글/영어 전환, 불필요 파일 정리 작업에서 효과가 컸습니다.

## 웹 뷰 비교

### Codex가 만든 페이지

Codex가 만든 페이지는 상품 목록, 상세 페이지, 장바구니, 로그인/계정 화면, 한글/영어 전환, 열고 닫는 UI 기능을 포함합니다.

사진 올려줄 칸:

![Codex web view 1](docs/codex-web-view-1.png)
![Codex web view 2](docs/codex-web-view-2.png)
![Codex web view 3](docs/codex-web-view-3.png)

### V0가 만든 페이지

V0가 만든 페이지는 원하는 전체적인 페이지 스타일과 비주얼 방향을 잡는 데 참고했습니다.

사진 올려줄 칸:

![V0 web view 1](docs/v0-web-view-1.png)
![V0 web view 2](docs/v0-web-view-2.png)
![V0 web view 3](docs/v0-web-view-3.png)

결과적으로 **V0가 원하는 페이지 스타일 방향을 잡아주고, Codex가 실제 프로젝트 안에서 기능과 데이터를 연결해 완성하는 방식**으로 진행했습니다.

## 프로젝트 구조

- `frontend/`: React + Vite 쇼핑몰 화면
- `backend/`: Spring Boot REST API
- `database/`: MySQL 스키마 및 시드 SQL

## 실행 방법

백엔드:

```bash
cd backend
mvn spring-boot:run
```

프론트엔드:

```bash
cd frontend
npm.cmd install
npm.cmd run dev
```

브라우저에서 Vite가 안내하는 로컬 주소로 접속하면 됩니다.

## 현재 구현

- 상품 목록
- 상품 상세
- 장바구니
- 로그인/회원가입
- 계정 화면
- 한글/영어 전환
- GANYMEDE 로고 적용
- 반응형 쇼핑몰 UI
