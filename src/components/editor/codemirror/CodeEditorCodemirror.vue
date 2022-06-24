<script setup lang="ts">
import type { PropType } from "vue"
import { onMounted, ref } from "vue"
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import type { LanguageID } from "@/core/languages"
import { updateListeners, defaultExtensions } from "./extensions"

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  language: {
    type: String as PropType<LanguageID>,
    required: true,
  },
})
const emit = defineEmits(["update:modelValue"])

const editor = {
  view: null as EditorView | null,
  state: null as EditorState | null,
}

const container = ref<HTMLDivElement | null>(null)

const handleDocChange = (newDoc: string) => {
  emit("update:modelValue", newDoc)
}

onMounted(() => {
  if (container.value == null) {
    throw new Error(
      "Failed to mount codemirror editor, container element is null"
    )
  }

  editor.state = EditorState.create({
    doc: props.modelValue,
    extensions: [
      ...defaultExtensions,
      updateListeners({
        onChange: handleDocChange,
      }),
    ],
  })

  editor.view = new EditorView({
    state: editor.state,
    parent: container.value,
  })
})
</script>

<template>
  <div ref="container" class="editor-container" />
</template>
