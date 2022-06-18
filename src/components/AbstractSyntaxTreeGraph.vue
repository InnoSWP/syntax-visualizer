<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import type { ASTNode } from "@/core/types"
import TreeGraph from "@/components/tree-graph/TreeGraph.vue"
import { generateTreeGraphNodeProxyFromASTNode } from "@/components/tree-graph/tmpProxy"

export default defineComponent({
  name: "AbstractSyntaxTreeGraph",
  components: { TreeGraph },
  props: {
    root: {
      type: Object as PropType<ASTNode>,
      required: true,
    },
  },
  computed: {
    rootProxy() {
      return generateTreeGraphNodeProxyFromASTNode(this.root)
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

::-webkit-scrollbar {
  width: 10px;
  height: 12px;
}

::-webkit-scrollbar-thumb:hover {
  border-radius: 5px;
  background: #dedede;
}

::-webkit-scrollbar-corner {
  background: #efefef;
}
</style>
