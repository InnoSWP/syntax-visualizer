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
        <AppIcon v-if="icon" :name="icon" class="tab-icon" />
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

.tab {
  display: flex;
  align-items: center;
  align-self: center;
  flex: 0 0 var(--tab-height);
  justify-content: space-between;
  width: calc(100% - 6px);
  height: var(--tab-height);
  margin: 6px 0;
  padding: 0 16px 0 10px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 2px 4px 10px 2px rgba(0, 0, 0, 0.25);
}

.tab-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.tab-icon,
.tab-heading {
  font-size: 1.25rem;
}

.tab-icon {
  margin-right: 6px;
}

.tab-heading {
  font-weight: 400;
}

.tab-panel {
  flex: 1 0 auto;
  height: calc(100% - var(--tab-height) - 12px);
}
</style>
