import { test, expect } from '@playwright/test'
import { prepareForSnapshot, getViewportType } from './helpers'

test.describe('Contact Form', () => {
  test('form can be filled out', async ({ page }) => {
    await page.goto('/')

    const nameInput = page.getByLabel(/your name/i)
    const emailInput = page.getByLabel(/your email/i)
    const messageInput = page.getByLabel(/how can we help/i)

    await nameInput.fill('John Doe')
    await emailInput.fill('john.doe@example.com')
    await messageInput.fill('This is a test message')

    await expect(nameInput).toHaveValue('John Doe')
    await expect(emailInput).toHaveValue('john.doe@example.com')
    await expect(messageInput).toHaveValue('This is a test message')
  })

  test('form can be filled out with all fields', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel(/your name/i).fill('John Doe')
    await page.getByLabel(/your email/i).fill('john.doe@example.com')
    await page.getByLabel(/organization name/i).fill('Acme Corporation')
    await page.getByLabel(/what does your organization do/i).fill('We build AI hardware')
    await page.getByLabel(/who can we thank/i).fill('TechCrunch')
    await page.getByLabel(/how can we help/i).fill('Need benchmarking help')

    await expect(page.getByLabel(/your name/i)).toHaveValue('John Doe')
    await expect(page.getByLabel(/organization name/i)).toHaveValue('Acme Corporation')
  })

  test('validation works for required fields', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to contact form section
    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300) // Wait for scroll to complete

    const submitButton = page.getByRole('button', { name: /let's go!/i })
    await submitButton.click()

    // Check for validation errors
    await expect(page.getByText(/name is required/i)).toBeVisible()
  })

  test('validation works for email format', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to contact form section
    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300) // Wait for scroll to complete

    const nameInput = page.getByLabel(/your name/i)
    const emailInput = page.getByLabel(/your email/i)
    const messageInput = page.getByLabel(/how can we help/i)

    await nameInput.fill('John Doe')
    await emailInput.fill('invalid-email')
    await messageInput.fill('Test message') // Fill message to isolate email validation

    // Bypass HTML5 validation to allow Vue validation to run
    await emailInput.evaluate((el: HTMLInputElement) => {
      el.setAttribute('type', 'text') // Change from 'email' to 'text' to bypass HTML5 validation
    })

    const submitButton = page.getByRole('button', { name: /let's go!/i })
    await submitButton.click()

    // Wait for Vue validation to process and error message to appear
    const form = page.locator('form').first()
    await expect(form.getByText(/please enter a valid email address/i)).toBeVisible({
      timeout: 5000,
    })
  })

  test('form can be submitted with valid data', async ({ page }) => {
    await page.goto('/')

    const nameInput = page.getByLabel(/your name/i)
    const emailInput = page.getByLabel(/your email/i)
    const messageInput = page.getByLabel(/how can we help/i)

    await nameInput.fill('John Doe')
    await emailInput.fill('john.doe@example.com')
    await messageInput.fill('This is a test message')

    const submitButton = page.getByRole('button', { name: /let's go!/i })
    await submitButton.click()

    // Wait for success message
    await expect(page.getByText(/thank you/i)).toBeVisible({ timeout: 5000 })
  })

  test('contact form header is visible', async ({ page }) => {
    await page.goto('/')

    // Scroll to contact section using section ID
    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()

    // Check for the contact form's own header
    await expect(page.getByRole('heading', { name: /let's talk/i })).toBeVisible()
    await expect(page.getByText(/we're here to help with your AI benchmarking/i)).toBeVisible()
  })

  test('contact form visual snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await prepareForSnapshot(page)

    // Scroll to contact form section
    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500) // Wait for any animations

    const viewportType = getViewportType(test.info().project.name)
    const form = page.locator('form').first()
    await expect(form).toHaveScreenshot(`contact-form-${viewportType}.png`)
  })

  test('contact form with validation errors visual snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await prepareForSnapshot(page)

    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()

    // Trigger validation errors
    const submitButton = page.getByRole('button', { name: /let's go!/i })
    await submitButton.click()

    await expect(page.getByText(/name is required/i)).toBeVisible()
    await page.waitForTimeout(300) // Wait for error display

    const viewportType = getViewportType(test.info().project.name)
    const form = page.locator('form').first()
    await expect(form).toHaveScreenshot(`contact-form-validation-errors-${viewportType}.png`)
  })

  test('contact form with filled data visual snapshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await prepareForSnapshot(page)

    const contactSection = page.locator('section#contact')
    await contactSection.scrollIntoViewIfNeeded()

    // Fill form
    const nameInput = page.getByLabel(/your name/i)
    const emailInput = page.getByLabel(/your email/i)
    const messageInput = page.getByLabel(/how can we help/i)

    await nameInput.fill('John Doe')
    await emailInput.fill('john.doe@example.com')
    await messageInput.fill('This is a test message')
    await page.waitForTimeout(300)

    const viewportType = getViewportType(test.info().project.name)
    const form = page.locator('form').first()
    await expect(form).toHaveScreenshot(`contact-form-filled-${viewportType}.png`)
  })
})
