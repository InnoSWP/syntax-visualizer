<script lang="ts">
import type { PropType } from "vue"
import { defineComponent } from "vue"
import AbstractSyntaxTreeGraph from "./graph/AbstractSyntaxTreeGraph.vue"
import type { ASTVariant } from "@/stores/settings"
import type { ASTNodes } from "@/core/types"

export default defineComponent({
  name: "AbstractSyntaxTree",
  components: { AbstractSyntaxTreeGraph },
  props: {
    nodes: {
      type: Array as PropType<ASTNodes>,
      required: false,
    },
    variant: {
      type: String as PropType<ASTVariant>,
      required: true,
    },
  },
})
</script>

<template>
  <div class="ast-root">
    <h3 v-if="!nodes">Write some (correct) code!</h3>
    <AbstractSyntaxTreeGraph v-else-if="variant === 'graph'" :nodes="nodes" />
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
