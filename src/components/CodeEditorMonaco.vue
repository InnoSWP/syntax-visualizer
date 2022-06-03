<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "CodeEditorMonaco",
})
</script>

<script lang="ts" setup>
import * as monaco from "monaco-editor"
import { onMounted, ref, defineEmits } from "vue"

const editor = ref()
const props = defineProps({
  value: {
    type: String,
    required: false,
    default: "",
  },
  language: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(["input"])

onMounted(() => {
  const defaultModel = monaco.editor.createModel(props.value, props.language)
  defaultModel.onDidChangeContent((e) => emit("input", e.eol))
  const editorModel = monaco.editor.create(editor.value)
  editorModel.setModel(defaultModel)
  editorModel.updateOptions({
    minimap: { enabled: false },
  })
  editorModel.layout()
})
</script>

<template>
  <div ref="editor" class="editor"></div>
</template>

<style scoped>
.editor {
  height: 100vh;
}
</style>
