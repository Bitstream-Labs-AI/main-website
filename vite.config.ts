import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(() => {
  const plugins: PluginOption[] = [vue(), vueJsx(), tailwindcss()]

  // Only enable Vue DevTools in development mode (not in test/production)
  // Check if we're running in test mode (set by Playwright)
  if (process.env.NODE_ENV !== 'test') {
    const devTools = vueDevTools()
    if (devTools) {
      plugins.push(devTools)
    }
  }

  // Parse allowed hosts from environment variable (comma-separated)
  const allowedHosts = process.env.VITE_PREVIEW_ALLOWED_HOSTS
    ? process.env.VITE_PREVIEW_ALLOWED_HOSTS.split(',').map((host) => host.trim())
    : undefined

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    preview: {
      allowedHosts,
    },
  }
})
