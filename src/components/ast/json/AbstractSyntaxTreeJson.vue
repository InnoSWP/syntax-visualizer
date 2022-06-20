<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import type { ASTNode } from "@/core/types"

function getCircularReplacer() {
  const seen = new WeakSet()
  return (key: string | number, value: unknown) => {
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
  name: "AbstractSyntaxTreeJson",
  props: {
    root: {
      type: Object as PropType<ASTNode>,
      required: true,
    },
  },
  computed: {
    treeJsonString() {
      return JSON.stringify(this.root, getCircularReplacer(), 2)
    },
  },
})
</script>

<template>
  <div class="root">
    <pre>{{ treeJsonString }}</pre>
  </div>
</template>

<style scoped>
.root {
  overflow: auto;
  width: 100%;
  height: 100%;
}
</style>
