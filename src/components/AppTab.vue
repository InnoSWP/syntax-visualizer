<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AppTab",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <div class="tab-root">
    <div class="tab" role="tab">
      <span class="tab-title-wrapper">
        <slot class="tab-title-icon" name="icon" />
        <h2 class="tab-heading">{{ title }}</h2>
      </span>
    </div>
    <div class="tab-panel" role="tabpanel">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
