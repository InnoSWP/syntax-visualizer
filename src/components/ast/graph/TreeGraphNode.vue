<script lang="ts">
import type { PropType } from "vue"
import { defineComponent } from "vue"
import type { ASTNodes } from "@/core/types"

export default defineComponent({
  name: "TreeGraphNode",
  props: {
    nodes: {
      type: Object as PropType<ASTNodes>,
      required: true,
    },
    index: {
      type: Number as PropType<number>,
      required: true,
    },
    getIsHighlighted: {
      type: Function as PropType<(index: number) => boolean>,
      required: false,
    },
    isRoot: Boolean,
    onMouseEnter: {
      type: Function as PropType<(index: number) => void>,
      required: false,
    },
    onMouseLeave: {
      type: Function as PropType<(index: number) => void>,
      required: false,
    },
  },
  computed: {
    data() {
      return this.nodes[this.index]
    },
    isLeaf() {
      return (
        !this.data.childrenIndexes || this.data.childrenIndexes.length === 0
      )
    },
  },
})
</script>

<template>
  <div
    :class="{
      'node-root': true,
      'node-root_leaf': isLeaf,
      'node-root_root': isRoot,
    }"
  >
    <div
      :class="{
        'node-rect': true,
        highlighted: getIsHighlighted?.(index),
      }"
      @mouseenter="() => onMouseEnter?.(index)"
      @mouseleave="() => onMouseLeave?.(index)"
    >
      <span class="node-rect__heading">{{ data.type }}</span>
      <span v-if="data.label" class="node-rect__subheading">
        {{ data.label }}
      </span>
      <div class="node-rect__circle-in"></div>
      <div class="node-rect__circle-out"></div>
    </div>
    <div v-if="!isLeaf" class="node-children-container">
      <TreeGraphNode
        v-for="childIndex in data.childrenIndexes"
        v-bind:key="`${index}-${childIndex}`"
        :get-is-highlighted="getIsHighlighted"
        :nodes="nodes"
        :index="childIndex"
        :on-mouse-enter="onMouseEnter"
        :on-mouse-leave="onMouseLeave"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
$border-width: 1px;
$circle-size: 8px;
$circle-padding: 6px;
$circle-total-size: $circle-size + $circle-padding;
$circle-total-size-with-border: $circle-total-size + $border-width * 2;
$circle-out-margin-left: 8px;
$circle-in-margin-top: 10px;

.node-root {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}

.node-rect {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 8px 12px;
  cursor: pointer;
  border: $border-width solid var(--color-border-default);
  border-radius: 4px;
  background-color: var(--color-primary);
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.25);

  &.highlighted {
    background: var(--color-highlight);
  }
}

.node-rect__heading {
  font-size: 16px;
}

.node-rect__subheading {
  font-size: 12px;
}

.node-rect__circle-out,
.node-rect__circle-in {
  position: absolute;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $circle-total-size-with-border;
  height: $circle-total-size-with-border;
  border-radius: $circle-total-size-with-border;
  background: linear-gradient(
    var(--circle-direction),
    var(--color-bg-node) 0%,
    var(--color-bg-node) 50%,
    var(--color-border-default) 50%,
    var(--color-border-default) 100%
  );

  &::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: $circle-total-size;
    height: $circle-total-size;
    border-radius: $circle-total-size;
    background: var(--color-bg-node);
  }

  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: $circle-size;
    height: $circle-size;
    border-radius: $circle-size;
    background: var(--color-border-default);
  }
}

.node-rect__circle-out {
  z-index: 1;
  bottom: calc(#{$circle-total-size-with-border} / -2);
  left: $circle-out-margin-left;
  --circle-direction: 180deg;
}

.node-rect__circle-in {
  top: $circle-in-margin-top;
  left: calc(#{$circle-total-size-with-border} / -2);
  visibility: hidden;
  --circle-direction: -90deg;
}

.node-root_leaf > .node-rect > .node-rect__circle-out {
  display: none;
}

.node-root_root > .node-rect > .node-rect__circle-in {
  display: none;
}

.node-children-container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 8px;
  padding-left: 30px;
  gap: 8px;
}
</style>
