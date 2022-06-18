<script setup lang="ts">
import type { PropType } from "vue"
import type { IconName } from "@/components/icons"
import icons from "@/components/icons"

defineProps({
  name: {
    type: String as PropType<IconName>,
    required: true,
  },
})
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
