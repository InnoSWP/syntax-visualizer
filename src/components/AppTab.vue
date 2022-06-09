<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AppTab",
  props: {
    title: {
      type: String,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
  },
})
</script>

<template>
  <div :class="['tab-root', 'row-' + row, 'col-' + col]">
    <div class="tab" role="tab">
      <div class="tab-title-wrapper">
        <slot class="tab-title-icon" name="icon" />
        <h2 class="tab-heading">{{ title }}</h2>
      </div>
    </div>
    <div class="tab-panel" role="tabpanel">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-root {
  display: flex;
  height: 100%;
  flex-direction: column;

  .row-1 {
    grid-row: 1 / span 1;
  }
  .row-2 {
    grid-row: 2 / span 1;
  }
  .row-3 {
    grid-row: 3 / span 1;
  }
  .col-1 {
    grid-column: 1 / span 1;
  }
  .col-2 {
    grid-column: 2 / span 1;
  }
  .col-3 {
    grid-column: 3 / span 1;
  }
}

.tab {
  display: flex;
  align-items: center;
  flex: 0 0 var(--tab-height);
  justify-content: space-between;
  width: 100%;
  height: var(--tab-height);
  padding: 0 16px 0 10px;
}

.tab-panel {
  flex: 1 0 auto;
  height: calc(100% - var(--tab-height));
}
</style>
