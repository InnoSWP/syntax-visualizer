<script setup lang="ts">
import { defineAsyncComponent } from "vue"
import type { PropType } from "vue"

defineProps({
  name: {
    type: String as PropType<IconName>,
    required: true,
  },
})

const icons = {
  moon: defineAsyncComponent(() => import("./icons/MoonIcon.vue")),
  sun: defineAsyncComponent(() => import("./icons/SunIcon.vue")),
  share: defineAsyncComponent(() => import("./icons/ShareIcon.vue")),
  copy: defineAsyncComponent(() => import("./icons/CopyIcon.vue")),
  copied: defineAsyncComponent(() => import("./icons/CopiedIcon.vue")),
  fileCode: defineAsyncComponent(() => import("./icons/FileCodeIcon.vue")),
  python: defineAsyncComponent(() => import("./icons/PythonIcon.vue")),
  downloadCode: defineAsyncComponent(() => import("./icons/DownloadCodeIcon.vue")),
  tree: defineAsyncComponent(() => import("./icons/TreeIcon.vue")),
  matrix: defineAsyncComponent(() => import("./icons/MatrixIcon.vue")),
  downloadAstNcm: defineAsyncComponent(() => import("./icons/DownloadAstNcmIcon.vue")),
  info: defineAsyncComponent(() => import("./icons/InfoIcon.vue")),
  gear: defineAsyncComponent(() => import("./icons/GearIcon.vue")),
} as const

export type IconName = keyof typeof icons
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    class="icon"
  >
    <component :is="icons[name]" />
  </svg>
</template>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
}
</style>
