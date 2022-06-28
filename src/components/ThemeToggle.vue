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
      :class="{ icon: true, left: true, inactive: !isDark }"
    />
    <AppIcon
      name="moon"
      :class="{ icon: true, right: true, inactive: !isLight }"
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
$bg: #000;
$fg: #fff;

.theme-toggle {
  position: relative;
  width: $width;
  height: $height;
  cursor: pointer;
  color: $fg;
  border: none;
  border-radius: $height;
  outline: none;
  background: $bg;
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
  color: $bg;
  border-radius: $toggle-size;
  background: $fg;

  &.left {
    left: $padding;
  }

  &.center {
    left: calc(#{$width - $toggle-size} / 2);
  }

  &.right {
    right: $padding;
  }
}

.icon {
  font-size: $toggle-size - 2px;
  position: absolute;
  top: $icon-size-diff + $padding;

  &.inactive {
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
