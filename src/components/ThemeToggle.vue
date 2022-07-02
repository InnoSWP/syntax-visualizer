<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/stores/settings"
import AppIcon from "./AppIcon.vue"

const settings = useSettingsStore()
const { theme } = storeToRefs(settings)

const isDark = computed(() => theme.value === "dark")
const isLight = computed(() => theme.value === "light")
const isSystem = computed(() => theme.value === "system")
</script>

<template>
  <button class="theme-toggle" @click="settings.toggleTheme">
    <span
      :class="{ toggle: true, left: isLight, right: isDark, center: isSystem }"
    >
    </span>
    <AppIcon
      name="sun"
      :class="{ icon: true, 'icon-light': true, left: true, active: isDark }"
    />
    <AppIcon
      name="moon"
      :class="{
        icon: true,
        'icon-dark': true,
        right: true,
        active: isLight,
      }"
    />
  </button>
</template>

<style scoped lang="scss">
$height: 24px;
$padding: 4px;
$toggle-size: $height - $padding * 2;
$width: $toggle-size * 2 + 10px;
$icon-size-diff: 1px;
$icon-size: $toggle-size - $icon-size-diff * 2;
$bg: #cfcfcf;
$shadow-color: rgba(0, 0, 0, 0.1);
$shadow-color-hover: rgba(0, 0, 0, 0.25);
$fg: #fff;

.theme-toggle {
  position: relative;
  width: $width;
  height: $height;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  color: $fg;
  border: none;
  border-radius: $height;
  outline: none;
  background: $bg;
  box-shadow: inset 0 0 6px 0 $shadow-color;

  &:hover {
    box-shadow: inset 0 0 6px 0 $shadow-color-hover;
  }
}

.toggle {
  position: absolute;
  top: $padding;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  width: $toggle-size;
  height: $toggle-size;
  transition: left 0.2s ease-in-out;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  color: $bg;
  border-radius: $toggle-size;
  background: $fg;
  box-shadow: 0 0 6px 0 $shadow-color;
  animation-fill-mode: forwards;

  &.left {
    left: $padding;
  }

  &.center {
    left: calc((#{$width} - #{$toggle-size}) / 2);
  }

  &.right {
    left: $width - $padding - $toggle-size;
  }
}

.icon {
  font-size: $toggle-size - 2px;
  position: absolute;
  top: $icon-size-diff + $padding;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  transform: scale(1);
  opacity: 1;

  &.inactive {
    transform: scale(0.6);
    opacity: 0;
  }

  &.left {
    left: $icon-size-diff + $padding;
  }

  &.right {
    right: $icon-size-diff + $padding;
  }
}
</style>
