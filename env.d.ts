/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly CYPRESS_COVERAGE: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S]
