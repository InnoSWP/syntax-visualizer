<script setup lang="ts">
import { ref } from "vue"

const PLACEHOLDER = "untitled"
const title = ref(PLACEHOLDER)
</script>

<template>
  <div class="document-title">
    <span class="overflow-shadow left" />
    <div class="text-wrapper">
      <input
        v-model="title"
        :placeholder="PLACEHOLDER"
        maxlength="50"
        class="input"
      />
      <span class="title-text">
        {{ title || PLACEHOLDER }}
      </span>
    </div>
    <span class="overflow-shadow right" />
  </div>
</template>

<style scoped lang="scss">
$padding: 12px;

.document-title {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  margin-right: 6px;
  padding-right: $padding;
  padding-left: $padding;
}

.text-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  max-width: calc(100% + #{$padding} * 2);
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
  width: $padding;
  height: 100%;
}

.overflow-shadow.left {
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}

.overflow-shadow.right {
  right: 0;
  background: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
