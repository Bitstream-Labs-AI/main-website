import type { Page } from '@playwright/test'

/**
 * Hides the Vue Inspector container (dev tools) if present.
 * This prevents it from appearing in visual snapshots.
 */
export async function hideDevTools(page: Page): Promise<void> {
  await page.evaluate(() => {
    const inspector = document.querySelector('.vue-inspector-container')
    if (inspector) {
      ;(inspector as HTMLElement).style.display = 'none'
    }
    const devtools = document.querySelector('#__vue-devtools-container__')
    if (devtools) {
      ;(devtools as HTMLElement).style.display = 'none'
    }
  })
}

/**
 * Hides the navigation element.
 * This prevents the mobile menu overlay from appearing in visual snapshots.
 */
export async function hideNavigation(page: Page): Promise<void> {
  const nav = page.locator('nav')
  await nav.evaluate((el: HTMLElement) => {
    el.style.display = 'none'
  })
}

/**
 * Prepares the page for visual snapshots by hiding dev tools and navigation.
 * This ensures clean, consistent snapshots without UI elements that might interfere.
 */
export async function prepareForSnapshot(
  page: Page,
  options?: { hideNav?: boolean },
): Promise<void> {
  await hideDevTools(page)
  if (options?.hideNav !== false) {
    await hideNavigation(page)
  }
}

/**
 * Gets the viewport type from the test project name.
 * Used for generating viewport-specific snapshot filenames.
 */
export function getViewportType(projectName: string | undefined): 'mobile' | 'tablet' | 'desktop' {
  if (!projectName) return 'desktop'
  if (projectName.includes('mobile')) return 'mobile'
  if (projectName.includes('tablet')) return 'tablet'
  return 'desktop'
}
