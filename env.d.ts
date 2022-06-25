/// <reference types="vite/client.d.ts" />
/// <reference types="vue/macros-global" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly CYPRESS_COVERAGE: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
