<script lang="ts">
import type { PropType } from "vue"
import { defineComponent } from "vue"
import AbstractSyntaxTreeGraph from "./graph/AbstractSyntaxTreeGraph.vue"
import type { ASTVariant } from "@/stores/parsing"
import type { ASTNodes } from "@/core/types"

export default defineComponent({
  name: "AbstractSyntaxTree",
  components: { AbstractSyntaxTreeGraph },
  props: {
    nodes: {
      type: Array as PropType<ASTNodes | null>,
      required: false,
    },
    variant: {
      type: String as PropType<ASTVariant>,
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
  <div class="ast-root">
    <h3 v-if="!nodes">Write some (correct) code!</h3>
    <AbstractSyntaxTreeGraph
      v-else-if="variant === 'graph'"
      :nodes="nodes"
      :highlight-node-index="highlightNodeIndex"
      @node-mouse-enter="(index) => $emit('node-mouse-enter', index)"
      @node-mouse-leave="(index) => $emit('node-mouse-leave', index)"
    />
    <!--  TODO: add JSON representation  -->
  </div>
</template>

<style scoped>
.ast-root {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
