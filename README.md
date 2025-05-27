# 🗂️ KanbanBoard

Next.js + TypeScript + Zustand + dnd-kit 기반의 칸반보드 프로젝트입니다.
드래그 앤 드롭, 카드 CRUD, 로컬스토리지 상태 저장, E2E 테스트(Playwright)까지 지원합니다.

---

## 📦 기술 스택

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **State Management**: Zustand (with persist middleware)
- **Drag & Drop**: dnd-kit
- **Styling**: Tailwind CSS
- **Testing**: Playwright, Vitest
- **Build Tool**: pnpm + Vite

---

## 🖥️ 프로젝트 실행 방법

```bash
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
├── public/                     # 정적 자산
├── tests/                      # E2E 테스트 파일
│   ├── kanban-actions.spec.ts # 카드 추가/수정/삭제/드래그 시나리오
│   └── open-browser.spec.ts   # 기본 진입 및 링크 이동 테스트
├── src/
│   ├── app/
│   │   ├── page.tsx           # 메인 페이지 (/)
│   │   └── kanban/
│   │       └── page.tsx       # 칸반 보드 페이지 (/kanban)
│   ├── components/
│   │   ├── Column.tsx         # 컬럼 그룹 컴포넌트
│   │   ├── Dialog.tsx         # 카드 추가/수정 팝업 UI
│   │   ├── DialogManager.tsx  # 팝업 상태 관리
│   │   ├── Droppable.tsx      # dnd-kit 드롭존
│   │   ├── Item.tsx           # 카드 아이템 UI
│   │   ├── SortableItem.tsx   # 드래그 가능한 카드 래퍼
│   │   └── Kanban.tsx         # 전체 보드 컴포넌트
│   ├── hooks/
│   │   ├── useDialog.ts       # 팝업 열기/닫기 상태 훅
│   │   └── useDragHandlers.ts # 드래그 이벤트 핸들러 훅
│   ├── store/
│   │   └── kanbanStore.ts     # Zustand 상태 저장소 + persist 적용
│   ├── types/
│   │   └── card.ts            # 카드 데이터 타입 정의
│   ├── utils/
│   │   └── date.ts            # 날짜 포맷 유틸 함수
│   └── styles/
│       └── globals.css        # 글로벌 스타일
├── playwright.config.ts       # E2E 테스트 설정
├── tailwind.config.ts         # Tailwind 설정
├── tsconfig.json              # 타입스크립트 설정
├── package.json               # 스크립트 및 의존성 정의
└── README.md                  # 설명 문서 (현재 파일)
```
