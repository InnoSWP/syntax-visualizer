/// <reference types="vite/client.d.ts" />
/// <reference types="vue/macros-global" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
