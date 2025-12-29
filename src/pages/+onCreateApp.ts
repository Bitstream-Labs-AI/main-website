// src/pages/+onCreateApp.ts
import { createHead } from '@unhead/vue/client'
// ^ If this still fails, try: import { createHead } from '@unhead/vue/client'

import { createPinia } from 'pinia'
import type { PageContext } from 'vike/types'

export default (pageContext: PageContext) => {
  const app = pageContext.app!

  // 1. Head (Unhead v2 subpath might be needed if @unhead/vue fails)
  const head = createHead()
  app.use(head)

  // 2. Pinia
  const pinia = createPinia()
  app.use(pinia)
}
