import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import vike from 'vike/plugin'

export default defineConfig(() => {
  const plugins: PluginOption[] = [
    tailwindcss(),
    vue({
      template: {
        compilerOptions: {
          // 1. Minifies whitespace in Vue templates
          whitespace: 'condense',
          // 2. Strips comments from the compiled Vue templates
          comments: false,
        },
      },
    }),
    vueJsx(),
    vike({
      prerender: true,
    }),
  ]
  // Only enable Vue DevTools in development mode (not in test/production)
  // Check if we're running in test mode (set by Playwright)
  if (process.env.NODE_ENV !== 'test') {
    const devTools = vueDevTools()
    if (devTools) {
      plugins.push(devTools)
    }
  }

  // Parse preview allowed hosts from environment variable (comma-separated)
  // Used for vite preview command - should include production domains like bitstreamlabs.ai and *.netlify.app
  const previewAllowedHostsEnv = process.env.VITE_PREVIEW_ALLOWED_HOSTS?.trim()
  const previewAllowedHosts: string[] = previewAllowedHostsEnv
    ? previewAllowedHostsEnv
        .split(',')
        .map((host) => host.trim())
        .filter((host) => host.length > 0)
    : ['localhost'] // Only allow localhost by default (restrictive)

  // Parse dev server allowed hosts from environment variable (comma-separated)
  // Used for vite dev command - can include Netlify dev server hosts
  const serverAllowedHostsEnv = process.env.VITE_SERVER_ALLOWED_HOSTS?.trim()
  const serverAllowedHosts: string[] = serverAllowedHostsEnv
    ? serverAllowedHostsEnv
        .split(',')
        .map((host) => host.trim())
        .filter((host) => host.length > 0)
    : ['localhost'] // Only allow localhost by default (restrictive)

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
      allowedHosts: previewAllowedHosts,
    },
    build: {
      // 3. Use Terser for aggressive minification and comment removal
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          // 4. Force all JS/CSS comments to be stripped
          comments: false,
        },
      },
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
          warn(warning)
        },
      },
    },
  }
})
