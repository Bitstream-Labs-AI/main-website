import { test, expect } from '@playwright/test'

test.describe('GitHub Links', () => {
  test('GitHub links are present', async ({ page }) => {
    await page.goto('/')

    const githubLink = page.getByRole('link', { name: /github/i })
    await expect(githubLink).toBeVisible()
  })

  test('GitHub links are clickable', async ({ page }) => {
    await page.goto('/')

    const githubLink = page.getByRole('link', { name: /github/i })
    await expect(githubLink).toBeEnabled()
  })

  test('GitHub links open in new tab', async ({ page }) => {
    await page.goto('/')

    const githubLink = page.getByRole('link', { name: /github/i })

    // Check that link has target="_blank"
    const target = await githubLink.getAttribute('target')
    expect(target).toBe('_blank')

    // Check that link has rel="noopener noreferrer"
    const rel = await githubLink.getAttribute('rel')
    expect(rel).toContain('noopener')
    expect(rel).toContain('noreferrer')
  })

  test('GitHub links point to correct URL', async ({ page }) => {
    await page.goto('/')

    const githubLink = page.getByRole('link', { name: /github/i })
    const href = await githubLink.getAttribute('href')

    expect(href).toBe('https://github.com/Bitstream-Labs-AI')
  })

  test('footer visual snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to footer
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500) // Wait for any animations

    const projectName = test.info().project.name || 'unknown'
    const viewportType = projectName.includes('mobile')
      ? 'mobile'
      : projectName.includes('tablet')
        ? 'tablet'
        : 'desktop'

    await expect(footer).toHaveScreenshot(`footer-${viewportType}.png`)
  })
})
