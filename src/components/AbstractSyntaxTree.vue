<script lang="ts">
import type { PropType } from "vue"
import { defineComponent } from "vue"
import AbstractSyntaxTreeGraph from "@/components/AbstractSyntaxTreeGraph.vue"
import AbstractSyntaxTreeJson from "@/components/AbstractSyntaxTreeJson.vue"
import type { ASTVariant } from "@/stores/settings"
import type { AST } from "@/core/types"

const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key: any, value: any) => {
    if (key === "parent") {
      return
    }
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export default defineComponent({
  name: "AbstractSyntaxTree",
  components: { AbstractSyntaxTreeJson, AbstractSyntaxTreeGraph },
  props: {
    variant: {
      type: String as PropType<ASTVariant>,
      required: true,
    },
    ast: {
      type: Object as PropType<AST | undefined>,
      required: false,
    },
  },
  computed: {
    astJson() {
      if (!this.ast) {
        return "No AST"
      }
      return JSON.stringify(this.ast, getCircularReplacer(), 2)
    },
  },
})
</script>

<template>
  <div class="root">
    <pre>{{ astJson }}</pre>
    <AbstractSyntaxTreeGraph v-if="variant === 'graph'" />
    <AbstractSyntaxTreeJson v-else />
  </div>
</template>

<style scoped>
.root {
  overflow: auto;
  max-height: 100%;
}
</style>
