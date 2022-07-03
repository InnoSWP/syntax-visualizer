<script setup lang="ts">
import { ref } from "vue"
import { useElementHover } from "@vueuse/core"

const container = ref()
const input = ref()

const PLACEHOLDER = "untitled"
const title = ref(PLACEHOLDER)
const isFocused = ref(false)
const isHovered = useElementHover(container)

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (!isFocused.value) {
    return
  }

  const keyCode = event.code.toLowerCase()

  switch (keyCode) {
    case "escape":
    case "enter":
      event.stopPropagation()
      event.preventDefault()
      input.value?.blur()
  }
})

const handleContainerClick = () => {
  input.value?.focus()
}

const handleInputFocus = () => {
  isFocused.value = true
}

const handleInputBlur = () => {
  isFocused.value = false
  title.value = title.value.trim()
}
</script>

<template>
  <div
    ref="container"
    :class="{
      'document-title': true,
      focused: isFocused,
      active: isHovered || isFocused,
    }"
    @click="handleContainerClick"
  >
    <span class="overflow-shadow left" />
    <div class="text-wrapper">
      <input
        ref="input"
        v-model="title"
        :placeholder="PLACEHOLDER"
        maxlength="50"
        class="input"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
      />
      <span class="title-text">
        {{ title || PLACEHOLDER }}
      </span>
    </div>
    <span class="overflow-shadow right" />
  </div>
</template>

<style scoped lang="scss">
$side-padding: 12px;

.document-title {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: flex-start;
  max-width: 300px;
  padding-right: var(--side-padding);
  padding-left: var(--side-padding);
  cursor: text;
  transition: box-shadow 0.2s ease, padding 0.2s ease;
  border-radius: 6px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0);

  --side-padding: 0px;

  &:hover:not(.focused) {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  }

  &.focused {
    box-shadow: 0 0 6px 4px rgba(#0075FF, 0.25);
  }

  &.active {
    --side-padding: #{$side-padding};
  }
}

.text-wrapper {
  position: relative;
  display: flex;
  justify-content: flex-start;
  max-width: calc(100% + var(--side-padding) * 2);
  padding: 4px 0;
}

%title-holder {
  font-family: var(--font-family);
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1;
}

.input {
  @extend %title-holder;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  color: var(--color-secondary-text);
}

.title-text {
  @extend %title-holder;
  position: relative;
  visibility: hidden;
  max-width: 100%;
  user-select: none;
  white-space: pre;
  pointer-events: none;
  opacity: 0;
}

.overflow-shadow {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: 0;
  height: 100%;
  transition: width 0.2s ease;
}

.document-title.active .overflow-shadow {
  width: var(--side-padding);
}

.overflow-shadow.left {
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(var(--color-primary), 1) 0%,
    rgba(var(--color-primary), 0) 100%
  );
}

.overflow-shadow.right {
  right: 0;
  background: linear-gradient(
    -90deg,
    rgba(var(--color-primary), 1) 0%,
    rgba(var(--color-primary), 0) 100%
  );
}
</style>
