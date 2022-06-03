<script lang="ts" setup>
import * as monaco from "monaco-editor"
import { onMounted, ref, watch } from "vue"

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: "",
  },
  language: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["update:value"])
const container = ref()

onMounted(() => {
  const editor = monaco.editor.create(container.value, {
    value: props.value,
    language: props.language,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
  })

  editor.onDidChangeModelContent(() => {
    emit("update:value", editor.getValue())
  })

  editor.focus()
  editor.setPosition({
    column: 10000000,
    lineNumber: 10000000,
  })

  watch(
    () => props.value,
    (newVal) => {
      if (editor.getValue() !== newVal) {
        editor.setValue(newVal)
      }
    }
  )
})
</script>

<template>
  <div ref="container" class="editor"></div>
</template>

<style scoped>
.editor {
  height: 100vh;
}
</style>
