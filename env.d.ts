/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_API_URL?: string
  readonly VITE_CONTACT_API_ENABLED?: string
  readonly VITE_CONTACT_FORM_ENABLED?: string
  readonly PLAYWRIGHT_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
