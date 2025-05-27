import { test, expect } from '@playwright/test'

test('메인 페이지 렌더링 및 칸반보드 링크 확인', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page.getByRole('heading', { name: '메인 페이지' })).toBeVisible()

  const kanbanLink = page.getByRole('link', { name: '칸반보드로 이동' })
  await expect(kanbanLink).toBeVisible()

  // 👉 URL 이동을 기다리며 클릭
  await Promise.all([
    page.waitForURL('**/kanban'),
    kanbanLink.click(),
  ])

  // 🔍 최종 URL 확인 (백업으로 넣어도 좋음)
  await expect(page).toHaveURL(/\/kanban/)
})
