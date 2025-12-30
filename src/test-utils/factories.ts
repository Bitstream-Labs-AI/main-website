// Test data factories
// Use factory functions with optional overrides for consistent test data

import { type ContactFormFrontendData } from '../schemas'

export function createMockContactFormFrontendData(
  overrides?: Partial<ContactFormFrontendData>,
): ContactFormFrontendData {
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message',
    marketingConsent: false,
    'g-recaptcha-response': 'mock-captcha-token',
    ...overrides,
  }
}
