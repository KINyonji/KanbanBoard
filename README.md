# 🗂️ KanbanBoard

Next.js + TypeScript + Zustand + dnd-kit 기반의 칸반보드 프로젝트입니다.

드래그 앤 드롭 기반 인터랙션, 카드 추가/수정/삭제(CRUD), 로컬 스토리지 상태 저장을 기본으로 지원하며,
Vitest를 활용한 유닛 테스트, Playwright 기반의 E2E 테스트, 그리고 GitHub Actions를 통한 자동화된 테스트(CI) 환경도 구축되어 있습니다.

---

## 📦 기술 스택

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **State Management**: Zustand (with persist middleware)
- **Drag & Drop**: dnd-kit
- **Styling**: Tailwind CSS
- **Testing**: Vitest, Playwright
- **Build Tool**: pnpm, Vite
- **CI/CD**: GitHub Actions

---

## 🖥️ 프로젝트 실행 방법

```bash
# Node 버전 설정
nvm use

# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev

# http://localhost:3000 접속
```

---

## 📁 디렉토리 구조

```bash
KanbanBoard/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI 설정
├── .nvmrc                      # 사용 Node.js 버전 명시
├── .npmrc                      # pnpm 관련 설정
├── .prettierrc                 # 코드 스타일 포맷 설정
├── eslint.config.mjs              # ESLint 설정
├── next.config.ts                 # Next.js 설정
├── postcss.config.js              # Tailwind + Autoprefixer 설정
├── public/                     # 정적 자산
├── tests/                      # E2E 테스트 파일 (Playwright)
│   ├── kanban-actions.spec.ts # 카드 추가/수정/삭제/드래그 시나리오
│   └── open-browser.spec.ts   # 기본 진입 및 링크 이동 테스트
├── src/
│   ├── app/
│   │   ├── favicon.ico            # 브라우저 탭 아이콘
│   │   ├── globals.css            # 글로벌 스타일 (Tailwind 기반)
│   │   ├── layout.tsx             # 공통 레이아웃 및 폰트 설정
│   │   ├── page.tsx               # 메인 페이지 (/)
│   │   └── kanban/
│   │       └── page.tsx           # 칸반 보드 페이지 (/kanban)
│   ├── components/
│   │   ├── Column.tsx             # 컬럼 그룹 컴포넌트
│   │   ├── Dialog.tsx             # 카드 추가/수정 팝업 UI
│   │   ├── DialogManager.tsx      # 팝업 상태 관리
│   │   ├── Droppable.tsx          # dnd-kit 드롭존
│   │   ├── Item.tsx               # 카드 아이템 UI
│   │   ├── SortableItem.tsx       # 드래그 가능한 카드 래퍼
│   │   └── Kanban.tsx             # 전체 보드 컴포넌트
│   ├── hooks/
│   │   ├── useDialog.ts           # 팝업 열기/닫기 상태 훅
│   │   └── useDragHandlers.ts     # 드래그 이벤트 핸들러 훅
│   ├── sensors/
│   │   └── CustomPointerSensor.ts # 사용자 정의 드래그 센서 (dnd-kit 커스터마이징)
│   ├── store/
│   │   └── kanbanStore.ts         # Zustand 상태 저장소 + persist 적용
│   ├── types/
│   │   ├── card.ts                # 카드 데이터 타입 정의
│   │   └── groupTitles.ts         # 컬럼 제목 목록 타입 정의
│   ├── utils/
│   │   └── date.ts                # 날짜 포맷 유틸 함수
├── playwright.config.ts           # E2E 테스트 설정
├── tailwind.config.ts             # Tailwind 설정
├── tsconfig.json                  # 타입스크립트 설정
├── package.json                   # 스크립트 및 의존성 정의
└── README.md                      # 설명 문서 (현재 파일)
```
---

## 🧪 테스트

본 프로젝트는 **유닛 테스트**와 **E2E 테스트**, **CI 연동 테스트 자동화**까지 지원합니다.

- **Vitest**를 활용한 유닛 테스트 구성
- **Playwright** 기반 브라우저 환경 시나리오 테스트
- **GitHub Actions** CI 워크플로우를 통한 푸시/PR 시 테스트 자동 실행

```bash
# 유닛 테스트 실행 (Vitest)
pnpm test

# E2E 테스트 실행 (Playwright)
pnpm exec playwright test
```

---

## 🖼️ Preview 

### ✅ 메인 페이지
![Image](https://github.com/user-attachments/assets/eb7d63a6-5cf4-48ec-a022-c5b2723cefb9)

### ✅ 칸반 보드
![Image](https://github.com/user-attachments/assets/cd25c54f-4ca7-454c-a6e6-b65df5403eca)
