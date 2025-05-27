import { test, expect } from "@playwright/test";

test.describe("칸반 보드 카드 동작 시나리오", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/kanban");

    // 기본 카드 1개 추가
    const addButton = page.getByRole("button", { name: "항목 추가" }).first();
    await addButton.click();

    await page.getByPlaceholder("이슈 제목을 입력해주세요").fill("기본 카드");
    await page.getByPlaceholder("담당자 id를 입력해주세요").fill("test-user");
    await page.getByRole("button", { name: "확인" }).click();

    await expect(page.getByText("기본 카드")).toBeVisible();
  });

  test("카드 추가", async ({ page }) => {
    const addButton = page.getByRole("button", { name: "항목 추가" }).first();
    await addButton.click();

    await page
      .getByPlaceholder("이슈 제목을 입력해주세요")
      .fill("Playwright 추가 테스트");
    await page.getByPlaceholder("담당자 id를 입력해주세요").fill("tester");
    await page.getByRole("button", { name: "확인" }).click();

    await expect(page.getByText("Playwright 추가 테스트")).toBeVisible();
    await expect(page.getByText("tester")).toBeVisible();
  });

  test("카드 수정", async ({ page }) => {
    const allButtons = await page.getByRole("button").allTextContents();
    console.log("버튼들:", allButtons);
    const firstCard = page.getByTestId("card").first();
    const editBtn = firstCard.getByRole("button", { name: "수정" });
    await editBtn.click();

    await page.waitForSelector('input[placeholder="이슈 제목을 입력해주세요"]');

    const titleInput = page.getByPlaceholder("이슈 제목을 입력해주세요");
    await titleInput.fill("수정된 카드 제목");

    const authorInput = page.getByPlaceholder("담당자 id를 입력해주세요");
    await authorInput.fill("수정자");

    await page.getByRole("button", { name: "확인" }).click();
    await expect(page.getByText("수정된 카드 제목")).toBeVisible();
  });

  test("카드 삭제", async ({ page }) => {
    const firstCard = page.getByTestId("card").first();
    const deleteBtn = firstCard.getByRole("button", { name: "삭제" });

    page.once("dialog", (dialog) => dialog.accept());
    await deleteBtn.click();

    await page.waitForSelector("text=기본 카드", { state: "detached" });
  });

  test("드래그로 순서 변경", async ({ page }) => {
    // 카드 2개 있어야 테스트 가능
    const addButton = page.getByRole("button", { name: "항목 추가" }).first();
    await addButton.click();
    await page
      .getByPlaceholder("이슈 제목을 입력해주세요")
      .fill("두 번째 카드");
    await page.getByPlaceholder("담당자 id를 입력해주세요").fill("drag-user");
    await page.getByRole("button", { name: "확인" }).click();

    const cards = await page.locator('[data-testid="card"]').all();

    if (cards.length < 2) test.skip();

    const firstCard = cards[0];
    const secondCard = cards[1];

    const secondBox = await secondCard.boundingBox();
    if (!secondBox) return;

    await firstCard.hover();
    await page.mouse.down();
    await page.mouse.move(secondBox.x + 10, secondBox.y + 10, { steps: 5 });
    await page.mouse.up();

    // 시각적 위치를 비교하거나, 드래그가 실행되었는지만 확인
    await expect(cards[1]).not.toHaveText("기본 카드");
  });

  test("로컬스토리지에 데이터 저장 확인", async ({ page }) => {
    const localData = await page.evaluate(() => {
      return window.localStorage.getItem("kanban-storage");
    });

    expect(localData).not.toBeNull();
    expect(localData!.length).toBeGreaterThan(10);
  });
});
