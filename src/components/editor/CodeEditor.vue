<script lang="ts">
import type { PropType } from "vue"
import { defineAsyncComponent, defineComponent } from "vue"
import type { LanguageID } from "@/core/languages"

export default defineComponent({
  name: "CodeEditor",
  components: {
    CodeEditorCodemirror: defineAsyncComponent({
      loader: () => import("./codemirror/CodeEditorCodemirror.vue"),
      // TODO: add loading and error components
    }),
  },
  props: {
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
    languageId: {
      type: String as PropType<LanguageID>,
      required: true,
    },
  },
  computed: {
    code: {
      get() {
        return this.modelValue
      },
      set(modelValue: string) {
        this.$emit("update:modelValue", modelValue)
      },
    },
  },
})
</script>

<template>
  <CodeEditorCodemirror
    v-model="code"
    :languageId="languageId"
    class="editor"
  />
</template>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}

.editor > :deep(*) {
  width: 100%;
  height: 100%;
}
</style>
