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
    automaticLayout: true,
    extraEditorClassName: "monaco",
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

<style>
/*
monaco will set this class on init
see extraEditorClassName setting above
*/
.monaco {
  overflow-y: hidden;
}
</style>
