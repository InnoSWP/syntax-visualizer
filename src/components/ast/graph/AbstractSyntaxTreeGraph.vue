<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import type { ASTNodes } from "@/core/types"
import TreeGraph from "./TreeGraph.vue"

export default defineComponent({
  name: "AbstractSyntaxTreeGraph",
  components: { TreeGraph },
  props: {
    nodes: {
      type: Array as PropType<ASTNodes>,
      required: true,
    },
    highlightNodeIndex: {
      type: Number as PropType<number>,
      required: false,
    },
  },
  emits: ["node-mouse-enter", "node-mouse-leave"],
})
</script>

<template>
  <div class="wrapper">
    <TreeGraph
      class="tree-graph"
      :nodes="nodes"
      :highlighted-node-index="highlightNodeIndex"
      @node-mouse-enter="(index) => $emit('node-mouse-enter', index)"
      @node-mouse-leave="(index) => $emit('node-mouse-leave', index)"
    />
  </div>
</template>

<style scoped>
.wrapper {
  overflow: auto;
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

.tree-graph {
  min-height: 100%;
}
</style>
