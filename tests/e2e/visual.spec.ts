import { test, expect } from '@playwright/test'

test.describe('Visual Regression - Full Page Snapshots', () => {
  test('home page full page snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Extract viewport info from project name
    const projectName = test.info().project.name || 'unknown'
    const viewportType = projectName.includes('mobile')
      ? 'mobile'
      : projectName.includes('tablet')
        ? 'tablet'
        : 'desktop'

    await expect(page).toHaveScreenshot(`home-page-full-${viewportType}.png`, {
      fullPage: true,
    })
  })

  test('contact form section snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const projectName = test.info().project.name || 'unknown'
    const viewportType = projectName.includes('mobile')
      ? 'mobile'
      : projectName.includes('tablet')
        ? 'tablet'
        : 'desktop'

    const form = page.locator('form').first()
    await expect(form).toHaveScreenshot(`contact-form-${viewportType}.png`)
  })

  test('footer snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const projectName = test.info().project.name || 'unknown'
    const viewportType = projectName.includes('mobile')
      ? 'mobile'
      : projectName.includes('tablet')
        ? 'tablet'
        : 'desktop'

    await expect(footer).toHaveScreenshot(`footer-${viewportType}.png`)
  })
})
