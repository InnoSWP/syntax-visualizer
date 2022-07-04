<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import TreeGraphNode from "./TreeGraphNode.vue"
import { drawLinesFromNodeToChildrenOnSvgRecursively } from "./domGraphicUtils"
import type { TreeNode } from "./types"

export default defineComponent({
  name: "TreeGraph",
  components: { TreeGraphNode },
  props: {
    root: {
      type: Object as PropType<TreeNode>,
      required: true,
    },
  },
  watch: {
    root() {
      this.updateTree()
    },
  },
  updated() {
    this.updateTree()
  },
  mounted() {
    this.updateTree()
  },
  methods: {
    updateTree() {
      const svg = this.$refs.curves as SVGElement
      svg.innerHTML = ""

      const container = this.$refs.nodes as HTMLDivElement
      const root = container.querySelector(
        ":scope > .node-root"
      ) as HTMLDivElement

      drawLinesFromNodeToChildrenOnSvgRecursively(root, svg)
    },
  },
})
</script>

<template>
  <div class="container">
    <div ref="nodes" class="nodes">
      <TreeGraphNode :data="root" is-root />
    </div>
    <svg ref="curves" class="curves"></svg>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  --color-border-default: #a9a9a9;
  --color-border-active: var(--color-accent);
  --stroke-width: 2px;
}

.container :deep(*) {
  font-family: monospace;
}

.nodes {
  z-index: 1;
}

.curves {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  overflow: visible;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.curves :deep(path) {
  stroke-width: var(--stroke-width);
  stroke: var(--color-border-default);
  fill: none;
}
</style>
