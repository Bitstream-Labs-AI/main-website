/**
 * Feature flags for controlling feature visibility.
 * Flags are controlled via environment variables.
 */

/**
 * Checks if the contact form feature is enabled.
 * @returns true if the contact form should be displayed, false otherwise
 */
export function isContactFormEnabled(): boolean {
  const flag = import.meta.env.VITE_CONTACT_FORM_ENABLED
  // Default to 'false' (disabled) if not set
  return flag === 'true'
}
