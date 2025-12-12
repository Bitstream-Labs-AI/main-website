import { test, expect } from '@playwright/test'
import { hideDevTools } from './helpers'

test.describe('Navigation', () => {
  test('navigation bar is visible', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    await expect(nav.getByText(/bitstream labs\.ai/i)).toBeVisible()
  })

  test.describe('Desktop Navigation', () => {
    // Scope to desktop viewport - navigation links are hidden on mobile
    test.use({ viewport: { width: 1280, height: 720 } })

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

  test.describe('Mobile Navigation Menu', () => {
    test.use({ viewport: { width: 375, height: 667 } }) // iPhone SE size

    test('mobile menu closed state snapshot', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      await hideDevTools(page)

      const nav = page.locator('nav')
      await expect(nav).toHaveScreenshot('mobile-menu-closed.png')
    })

    test('mobile menu open state snapshot', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      await hideDevTools(page)

      // Open menu
      const hamburgerButton = page.getByRole('button', { name: /open menu/i })
      await hamburgerButton.click()
      await page.waitForTimeout(300) // Wait for animation

      // Take snapshot of the entire page with menu open
      await expect(page).toHaveScreenshot('mobile-menu-open.png', {
        fullPage: true,
      })
    })

    test('hamburger button is visible on mobile', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Hamburger button should be visible
      const hamburgerButton = page.getByRole('button', { name: /open menu/i })
      await expect(hamburgerButton).toBeVisible()

      // Desktop menu should be hidden
      const desktopMenu = page.locator('nav ul').first()
      await expect(desktopMenu).not.toBeVisible()
    })

    test('menu opens when hamburger is clicked', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Hamburger button should be visible (menu closed)
      const hamburgerButton = page.getByRole('button', { name: /open menu/i })
      await expect(hamburgerButton).toBeVisible()

      // Click hamburger to open menu
      await hamburgerButton.click()

      // Wait for drawer to appear and animation
      await page.waitForTimeout(500)

      // Button should now be labeled as "Close menu"
      const closeButton = page.getByRole('button', { name: /close menu/i })
      await expect(closeButton).toBeVisible()

      // Drawer should be visible (aria-hidden="false")
      const drawer = page
        .locator('[aria-hidden="false"]')
        .filter({ hasText: /home|about|contact/i })
        .first()
      await expect(drawer).toBeVisible()

      // All navigation items should be visible in drawer
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /about us/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /contact/i })).toBeVisible()
    })

    test('menu closes when X button is clicked', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Open menu first
      const hamburgerButton = page.getByRole('button', { name: /open menu/i })
      await hamburgerButton.click()
      await page.waitForTimeout(500) // Wait for menu to fully open

      // Verify menu is open - button should now be "Close menu"
      const closeButton = page.getByRole('button', { name: /close menu/i })
      await expect(closeButton).toBeVisible()

      // Verify drawer is visible
      const drawer = page
        .locator('[aria-hidden="false"]')
        .filter({ hasText: /home|about|contact/i })
        .first()
      await expect(drawer).toBeVisible()

      // Click close button (same button, now shows X icon)
      await closeButton.click()
      await page.waitForTimeout(500) // Wait for animation

      // Drawer should be gone (v-if removes it, so we check it doesn't exist)
      await expect(drawer).not.toBeVisible({ timeout: 1000 })

      // Button should be back to "Open menu"
      const hamburgerButtonAgain = page.getByRole('button', { name: /open menu/i })
      await expect(hamburgerButtonAgain).toBeVisible()
    })

    test('menu closes when navigation link is clicked', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Open menu
      const hamburgerButton = page.getByRole('button', { name: /open menu/i })
      await hamburgerButton.click()
      await page.waitForTimeout(500) // Wait for menu to fully open

      // Verify drawer is visible
      const drawer = page
        .locator('[aria-hidden="false"]')
        .filter({ hasText: /home|about|contact/i })
        .first()
      await expect(drawer).toBeVisible()

      // Click a navigation link
      const aboutButton = page.getByRole('button', { name: /about us/i })
      await aboutButton.click()
      await page.waitForTimeout(800) // Wait for scroll and menu close

      // Drawer should be closed (not visible)
      await expect(drawer).not.toBeVisible({ timeout: 1000 })

      // Should have scrolled to about section
      const missionHeading = page.getByRole('heading', { name: /our mission/i })
      await expect(missionHeading).toBeVisible()
    })

    test('navigation works on mobile viewport', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Open menu
      const hamburgerButton = page.getByRole('button', { name: /open menu/i })
      await hamburgerButton.click()
      await page.waitForTimeout(500) // Wait for menu to fully open

      // Navigate to About section
      await page.getByRole('button', { name: /about us/i }).click()
      await page.waitForTimeout(800) // Wait for scroll and menu close

      // Verify we're at about section
      const missionHeading = page.getByRole('heading', { name: /our mission/i })
      await expect(missionHeading).toBeVisible()

      // Open menu again
      await hamburgerButton.click()
      await page.waitForTimeout(500) // Wait for menu to fully open

      // Navigate to Contact section
      await page.getByRole('button', { name: /contact/i }).click()
      await page.waitForTimeout(800) // Wait for scroll and menu close

      // Verify we're at contact section
      const contactHeading = page.getByRole('heading', { name: /let's talk/i })
      await expect(contactHeading).toBeVisible()
    })
  })
})
