<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import AbstractSyntaxTreeGraph from "@/components/AbstractSyntaxTreeGraph.vue"
import AbstractSyntaxTreeJson from "@/components/AbstractSyntaxTreeJson.vue"
import type { ASTVariant } from "@/stores/settings"

export default defineComponent({
  name: "AbstractSyntaxTree",
  components: { AbstractSyntaxTreeJson, AbstractSyntaxTreeGraph },
  props: {
    variant: {
      type: String as PropType<ASTVariant>,
      required: true,
    },
  },
})
</script>

<template>
  <div class="root">
    <abstract-syntax-tree-graph v-if="variant === 'graph'" />
    <abstract-syntax-tree-json v-else />
  </div>
</template>

<style scoped></style>
