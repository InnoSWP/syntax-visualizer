<script lang="ts">
import type { PropType } from "vue"
import { defineComponent } from "vue"
import AppIcon from "@/components/AppIcon.vue"
import type { IconName } from "@/components/icons"

export default defineComponent({
  name: "AppTab",
  components: { AppIcon },
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String as PropType<IconName>,
      required: false,
    },
    row: {
      type: Number as PropType<1 | 2 | 3>,
      required: true,
    },
    col: {
      type: Number as PropType<1 | 2 | 3>,
      required: true,
    },
  },
})
</script>

<template>
  <div :class="['tab-root', `row-${row}`, `col-${col}`]">
    <div class="tab-wrapper">
      <div class="tab" role="tab">
        <div class="tab-title-wrapper">
          <AppIcon v-if="icon" :name="icon" class="tab-icon" />
          <h2 class="tab-heading">{{ title }}</h2>
        </div>
        <div class="tab-menu">
          <slot name="menu" />
        </div>
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
  flex-direction: column;
  height: 100%;

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

.tab-wrapper {
  padding: 6px;
}

.tab {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  align-self: center;
  flex: 0 0 var(--tab-height);
  justify-content: space-between;
  width: 100%;
  height: var(--tab-height);
  padding: 0 10px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 2px 4px 10px 2px rgba(0, 0, 0, 0.25);
}

.tab-title-wrapper,
.tab-menu {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.tab-title-wrapper {
  min-width: 0;
}

.tab-menu {
  flex: 0 0 auto;
}

.tab-icon {
  flex: 0 0 auto;
  margin-right: 6px;
}

.tab-heading {
  font: inherit;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tab-panel {
  overflow: hidden;
  flex: 1 0 auto;
  height: calc(100% - var(--tab-height) - 12px);
}
</style>
