<script lang="ts" setup>
import * as monaco from "monaco-editor"
import { onMounted, ref, watch } from "vue"
import { darkTheme, lightTheme } from "./themes"

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
  monaco.editor.defineTheme("sv-light", lightTheme)
  monaco.editor.defineTheme("sv-dark", darkTheme)

  const editor = monaco.editor.create(container.value, {
    value: props.value,
    language: props.language,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: true,
    automaticLayout: true,
    extraEditorClassName: "monaco",
    theme: "sv-light",
  })

  editor.onDidChangeModelContent(() => {
    emit("update:value", editor.getValue())
  })

  editor.focus()
  editor.setPosition({
    column: Infinity,
    lineNumber: Infinity,
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
  <div ref="container"></div>
</template>
