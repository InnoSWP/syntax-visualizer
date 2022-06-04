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
    value: {
      type: String,
      required: false,
      default: "",
    },
    language: {
      type: String,
      required: false,
      default: "typescript",
    },
    variant: {
      type: String as PropType<CodeEditorVariant>,
      required: true,
    },
  },
  computed: {
    valueModel: {
      get() {
        return this.value
      },
      set(value: string) {
        this.$emit("update:value", value)
      },
    },
  },
})
</script>

<template>
  <div class="root">
    <CodeEditorMonaco
      v-if="variant === 'monaco-editor'"
      v-model:value="valueModel"
      :language="language"
    />
    <CodeEditorCodemirror v-else />
  </div>
</template>

<style scoped></style>
