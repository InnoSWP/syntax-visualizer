<script setup lang="ts">
import type { PropType } from "vue"
import { onMounted, ref, watch } from "vue"
import { Compartment, EditorState } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import type { LanguageID } from "@/core/languages"
import { loadCodemirrorLanguageSupport } from "@/core/languages"
import { defaultExtensions, updateListeners } from "./extensions"

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  languageId: {
    type: String as PropType<LanguageID>,
    required: true,
  },
  autofocus: Boolean,
})

const emit = defineEmits(["update:modelValue"])

const container = ref<HTMLDivElement | null>(null)

const handleDocChange = (newDoc: string) => {
  emit("update:modelValue", newDoc)
}

const editor = {
  state: null as EditorState | null,
  view: null as EditorView | null,
}

const language = new Compartment()

onMounted(() => {
  if (container.value == null) {
    throw new Error(
      "Failed to mount codemirror editor, container element is null"
    )
  }

  editor.state = EditorState.create({
    doc: props.modelValue,
    extensions: [
      defaultExtensions,
      language.of([]),
      updateListeners({
        onChange: handleDocChange,
      }),
    ],
  })

  editor.view = new EditorView({
    state: editor.state,
    parent: container.value,
  })

  // Handle language change
  watch(
    () => props.languageId,
    async (newLanguage) => {
      const languageSupport = await loadCodemirrorLanguageSupport(newLanguage)
      if (languageSupport) {
        editor.view?.dispatch({
          effects: language.reconfigure(languageSupport),
        })
      } else {
        // TODO: handle case when there is no codemirror language support
      }
    },
    { immediate: true }
  )

  if (props.autofocus) {
    editor.view.focus()
  }
})
</script>

<template>
  <div ref="container" class="editor-container" />
</template>
