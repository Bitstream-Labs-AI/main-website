// Test data factories
// Use factory functions with optional overrides for consistent test data

import { type ContactFormData } from '../schemas/contact-form'

export function createMockContactFormData(overrides?: Partial<ContactFormData>): ContactFormData {
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message',
    marketingConsent: false,
    ...overrides,
  }
}
