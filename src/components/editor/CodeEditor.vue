<script lang="ts">
import type { PropType } from "vue"
import { defineAsyncComponent, defineComponent } from "vue"
import type { LanguageId } from "@/core/languages"

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
      type: String as PropType<LanguageId>,
      required: true,
    },
    autofocus: Boolean,
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
  emits: ["update:modelValue", "blur"],
})
</script>

<template>
  <CodeEditorCodemirror
    v-model="code"
    v-bind="{ languageId, autofocus }"
    class="editor"
    @blur="$emit('blur')"
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
