<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue"
import type { PropType } from "vue"
import type { CodeEditorVariant } from "@/stores/settings"

export default defineComponent({
  name: "CodeEditor",
  components: {
    CodeEditorMonaco: defineAsyncComponent({
      loader: () => import("@/components/CodeEditorMonaco.vue"),
      // TODO: add loading and error components
    }),
    CodeEditorCodemirror: defineAsyncComponent({
      loader: () => import("@/components/CodeEditorCodemirror.vue"),
      // TODO: add loading and error components
    }),
  },
  props: {
    variant: {
      type: String as PropType<CodeEditorVariant>,
      required: true,
    },
  },
})
</script>

<template>
  <div class="root">
    <CodeEditorMonaco v-if="variant === 'monaco-editor'" />
    <CodeEditorCodemirror v-else />
  </div>
</template>

<style scoped></style>
