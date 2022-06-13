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
