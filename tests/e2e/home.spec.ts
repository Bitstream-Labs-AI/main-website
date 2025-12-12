import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('displays mission statement', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to about section to ensure it's visible
    const missionHeading = page.getByRole('heading', { name: /our mission/i })
    await missionHeading.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300) // Wait for scroll to complete

    await expect(missionHeading).toBeVisible()

    // Find the about section and target the strong element specifically
    // This avoids the duplicate text in the hero section
    const aboutSection = page.locator('section#about')
    const missionStrong = aboutSection.locator('strong').filter({
      hasText: /we set the standard in AI benchmarking/i,
    })
    await expect(missionStrong).toBeVisible()
  })

  test('displays vision statement', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /our vision/i })).toBeVisible()
    await expect(page.getByText(/to unite AI and hardware engineering/i)).toBeVisible()
  })

  test('page loads correctly', async ({ page }) => {
    await page.goto('/')

    // Check for navigation
    await expect(page.locator('nav')).toBeVisible()

    // Check for hero heading
    await expect(page.getByRole('heading', { name: /bitstream labs\.ai/i })).toBeVisible()
  })

  test('home page visual snapshot', async ({ page }) => {
    await page.goto('/')

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    const projectName = test.info().project.name || 'unknown'
    const viewportType = projectName.includes('mobile')
      ? 'mobile'
      : projectName.includes('tablet')
        ? 'tablet'
        : 'desktop'

    // Take full page screenshot
    await expect(page).toHaveScreenshot(`home-page-${viewportType}.png`, {
      fullPage: true,
    })
  })

  test('hero section visual snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const projectName = test.info().project.name || 'unknown'
    const viewportType = projectName.includes('mobile')
      ? 'mobile'
      : projectName.includes('tablet')
        ? 'tablet'
        : 'desktop'

    const heroSection = page.locator('main').first()
    await expect(heroSection).toHaveScreenshot(`hero-section-${viewportType}.png`)
  })

  test('about us section visual snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to about section to ensure it's fully visible
    const aboutSection = page.locator('section#about')
    await aboutSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500) // Wait for any animations

    const projectName = test.info().project.name || 'unknown'
    const viewportType = projectName.includes('mobile')
      ? 'mobile'
      : projectName.includes('tablet')
        ? 'tablet'
        : 'desktop'

    await expect(aboutSection).toHaveScreenshot(`about-section-${viewportType}.png`)
  })
})
