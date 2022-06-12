<script lang="ts">
import type { PropType } from "vue"
import { defineComponent } from "vue"
import AbstractSyntaxTreeGraph from "@/components/AbstractSyntaxTreeGraph.vue"
import AbstractSyntaxTreeJson from "@/components/AbstractSyntaxTreeJson.vue"
import type { ASTVariant } from "@/stores/settings"
import type { ASTNode } from "@/core/types"

export default defineComponent({
  name: "AbstractSyntaxTree",
  components: { AbstractSyntaxTreeJson, AbstractSyntaxTreeGraph },
  props: {
    root: {
      type: Object as PropType<ASTNode>,
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
    <h3 v-if="!root">Write some (correct) code!</h3>
    <AbstractSyntaxTreeGraph v-else-if="variant === 'graph'" />
    <AbstractSyntaxTreeJson v-else :root="root" />
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
