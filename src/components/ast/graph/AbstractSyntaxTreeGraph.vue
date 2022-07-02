<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import type { ASTNodes } from "@/core/types"
import TreeGraph from "./TreeGraph.vue"
import { generateTreeGraphNodeProxyFromASTNode } from "./tmpProxy"

export default defineComponent({
  name: "AbstractSyntaxTreeGraph",
  components: { TreeGraph },
  props: {
    nodes: {
      type: Array as PropType<ASTNodes>,
      required: true,
    },
  },
  computed: {
    rootProxy() {
      return generateTreeGraphNodeProxyFromASTNode(this.nodes[0], this.nodes)
    },
  },
})
</script>

<template>
  <div class="wrapper">
    <TreeGraph class="tree-graph" :root="rootProxy" />
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
