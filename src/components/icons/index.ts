import { defineAsyncComponent } from "vue"

// prettier-ignore
const icons = {
  copied: defineAsyncComponent(() => import("./CopiedIcon.vue")),
  copy: defineAsyncComponent(() => import("./CopyIcon.vue")),
  doneCircle: defineAsyncComponent(() => import("./DoneCircleIcon.vue")),
  downloadAstNcm: defineAsyncComponent(() => import("./DownloadAstNcmIcon.vue")),
  downloadCode: defineAsyncComponent(() => import("./DownloadCodeIcon.vue")),
  fileCode: defineAsyncComponent(() => import("./FileCodeIcon.vue")),
  gear: defineAsyncComponent(() => import("./GearIcon.vue")),
  info: defineAsyncComponent(() => import("./InfoIcon.vue")),
  matrix: defineAsyncComponent(() => import("./MatrixIcon.vue")),
  moon: defineAsyncComponent(() => import("./MoonIcon.vue")),
  python: defineAsyncComponent(() => import("./PythonIcon.vue")),
  share: defineAsyncComponent(() => import("./ShareIcon.vue")),
  sun: defineAsyncComponent(() => import("./SunIcon.vue")),
  tree: defineAsyncComponent(() => import("./TreeIcon.vue")),
} as const

export type IconName = keyof typeof icons

export default icons
