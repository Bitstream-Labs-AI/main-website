import { test, expect } from '@playwright/test'
import { prepareForSnapshot, getViewportType } from './helpers'

test.describe('Visual Regression - Full Page Snapshots', () => {
  test('home page full page snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Don't hide nav - it should be visible at the top
    await prepareForSnapshot(page, { hideNav: false })

    const viewportType = getViewportType(test.info().project.name)
    await expect(page).toHaveScreenshot(`home-page-full-${viewportType}.png`, {
      fullPage: true,
    })
  })

  test('footer snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await prepareForSnapshot(page)

    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const viewportType = getViewportType(test.info().project.name)
    await expect(footer).toHaveScreenshot(`footer-${viewportType}.png`)
  })
})
