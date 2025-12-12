// Test helper functions
// Common utilities for testing Vue components

export function waitForNextTick(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}
