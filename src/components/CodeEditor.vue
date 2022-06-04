<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue"
import type { PropType } from "vue"
import type { CodeEditorLanguage, CodeEditorVariant } from "@/stores/settings"

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
  data() {
    return {
      code: this.$props.value,
    }
  },
  watch: {
    code(newValue: string) {
      this.$emit("update:value", newValue)
    },
    value(newValue: string) {
      this.code = newValue
    },
  },
  emits: ["update:value"],
  props: {
    value: {
      type: String,
      required: false,
      default: "",
    },
    variant: {
      type: String as PropType<CodeEditorVariant>,
      required: true,
    },
    language: {
      type: String as PropType<CodeEditorLanguage>,
      required: false,
      default: "typescript",
    },
  },
})
</script>

<template>
  <div class="root">
    <CodeEditorMonaco
      v-if="variant === 'monaco-editor'"
      v-model:value="code"
      :language="language"
    />
    <CodeEditorCodemirror v-else />
  </div>
</template>

<style scoped></style>
