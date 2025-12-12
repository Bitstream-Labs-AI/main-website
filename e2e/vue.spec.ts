import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  // Check for main hero heading instead of default Vue message
  await expect(page.getByRole('heading', { name: /bitstream labs\.ai/i })).toBeVisible()
})
