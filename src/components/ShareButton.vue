<script setup lang="ts">
import { ref } from "vue"
import { useClipboard, useElementHover } from "@vueuse/core"
import AppIcon from "@/components/AppIcon.vue"

const source = ref("Work in progress 🚧")
const { copy, copied } = useClipboard({ source, copiedDuring: 3000 })
const container = ref()
const isHovered = useElementHover(container)

const handleClick = () => {
  copy()
}
</script>

<template>
  <button
    ref="container"
    title="Copy link to share"
    :class="{ 'share-button': true, copied: copied }"
    @click="handleClick"
  >
    <AppIcon
      name="share"
      :class="{
        icon: true,
        active: !isHovered && !copied,
      }"
    />
    <AppIcon
      name="copy"
      :class="{ icon: true, active: !copied && isHovered }"
    />
    <AppIcon name="doneCircle" :class="{ icon: true, active: copied }" />
  </button>
</template>

<style scoped lang="scss">
.share-button {
  font-size: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;

  &.copied {
    color: #1ebd55;
  }
}

.icon {
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.125s ease, transform 0.125s ease;
  transform: scale(0.65);
  opacity: 0;

  &.active {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
