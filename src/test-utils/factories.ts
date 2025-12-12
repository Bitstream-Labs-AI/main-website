// Test data factories
// Use factory functions with optional overrides for consistent test data

export interface ContactFormData {
  name: string
  email: string
  organizationName?: string
  organizationDescription?: string
  referralSource?: string
  message: string
}

export function createMockContactFormData(overrides?: Partial<ContactFormData>): ContactFormData {
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'This is a test message',
    ...overrides,
  }
}
