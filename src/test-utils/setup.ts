// Global test configuration
// This file runs before all tests

// Disable API calls in test environment to ensure no-op behavior
// This prevents actual HTTP requests during unit tests
// Note: Vite environment variables are set via vitest.config.ts, not here
// This file is for test setup code that runs before each test file

import { vi } from 'vitest'

declare global {
  var grecaptcha: {
    getResponse: () => string
    reset: () => void
  }
}

// Mock the global grecaptcha object
global.grecaptcha = {
  getResponse: vi.fn().mockReturnValue('mock-captcha-token'),
  reset: vi.fn(),
}

// If you are using vi.mock for your services
vi.mock('@/services/contactFormService', () => ({
  submitContactForm: vi.fn().mockResolvedValue(undefined),
}))
