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
    : []

  // Also support dev server allowed hosts (for Netlify dev server)
  // Parse server allowed hosts from environment variable
  const serverAllowedHostsList = process.env.VITE_SERVER_ALLOWED_HOSTS
    ? process.env.VITE_SERVER_ALLOWED_HOSTS.split(',').map((host) => host.trim())
    : []

  // Create allowed hosts function for dev server
  // Allows Netlify dev server hosts by default, plus any explicitly configured hosts
  const serverAllowedHosts = serverAllowedHostsList
    ? serverAllowedHostsList
    : (host: string) => {
        // Allow Netlify dev server hosts (devserver-*.netlify.app)
        if (host.includes('.netlify.app')) {
          return true
        }
        // Allow localhost and local IPs
        if (host === 'localhost' || host.startsWith('127.') || host.startsWith('192.168.')) {
          return true
        }
        return false
      }

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      allowedHosts: serverAllowedHosts,
    },
    preview: {
      allowedHosts,
    },
  }
})
