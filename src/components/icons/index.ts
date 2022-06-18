import { defineAsyncComponent } from "vue"

// prettier-ignore
const icons = {
  copied: defineAsyncComponent(() => import("@/components/icons/CopiedIcon.vue")),
  copy: defineAsyncComponent(() => import("@/components/icons/CopyIcon.vue")),
  downloadAstNcm: defineAsyncComponent(() => import("@/components/icons/DownloadAstNcmIcon.vue")),
  downloadCode: defineAsyncComponent(() => import("@/components/icons/DownloadCodeIcon.vue")),
  fileCode: defineAsyncComponent(() => import("@/components/icons/FileCodeIcon.vue")),
  gear: defineAsyncComponent(() => import("@/components/icons/GearIcon.vue")),
  info: defineAsyncComponent(() => import("@/components/icons/InfoIcon.vue")),
  matrix: defineAsyncComponent(() => import("@/components/icons/MatrixIcon.vue")),
  moon: defineAsyncComponent(() => import("@/components/icons/MoonIcon.vue")),
  python: defineAsyncComponent(() => import("@/components/icons/PythonIcon.vue")),
  share: defineAsyncComponent(() => import("@/components/icons/ShareIcon.vue")),
  sun: defineAsyncComponent(() => import("@/components/icons/SunIcon.vue")),
  tree: defineAsyncComponent(() => import("@/components/icons/TreeIcon.vue")),
} as const

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]

export default icons
