// src/pages/+config.ts
import vikeVue from 'vike-vue/config'
import type { Config } from 'vike/types'

export default {
  extends: [vikeVue],
  prerender: true,
  title: 'Bitstream Labs.AI',
  // Vike-vue will automatically look for +onCreateApp.ts in the same folder
} satisfies Config
