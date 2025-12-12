import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('navigation bar is visible', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    await expect(nav.getByText(/bitstream labs\.ai/i)).toBeVisible()
  })

  test('navigation links are visible', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('button', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /about us/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /contact/i })).toBeVisible()
  })

  test('navigation scrolls to sections', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click About Us link
    await page.getByRole('button', { name: /about us/i }).click()
    await page.waitForTimeout(500) // Wait for scroll

    // Check if we're at the about section (which contains Mission and Vision)
    const missionHeading = page.getByRole('heading', { name: /our mission/i })
    await expect(missionHeading).toBeVisible()

    // Click Contact link
    await page.getByRole('button', { name: /contact/i }).click()
    await page.waitForTimeout(500)

    // Check if we're at the contact section (using the form's header)
    const contactHeading = page.getByRole('heading', { name: /let's talk/i })
    await expect(contactHeading).toBeVisible()
  })

  test('navigation logo scrolls to top', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll down first
    await page.getByRole('button', { name: /about us/i }).click()
    await page.waitForTimeout(500)

    // Click logo
    const logo = page.locator('nav').getByText(/bitstream labs\.ai/i)
    await logo.click()
    await page.waitForTimeout(500)

    // Check if we're back at the top (hero section)
    const heroHeading = page.getByRole('heading', { name: /bitstream labs\.ai/i })
    await expect(heroHeading).toBeVisible()
  })
})
