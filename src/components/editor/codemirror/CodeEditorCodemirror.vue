<script setup lang="ts">
import type { PropType } from "vue"
import { onMounted, ref, watch } from "vue"
import { Compartment, EditorState } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import type { LanguageId } from "@/core/languages"
import { loadCodemirrorLanguageSupport } from "@/core/languages"
import { defaultExtensions, updateListeners } from "./extensions"
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/stores/settings";
import { ThemeManager } from "@/components/editor/codemirror/extensions/themes/manager";
import { basicDark } from "@/components/editor/codemirror/extensions/themes/dark";
import { basicLight } from "@/components/editor/codemirror/extensions/themes/light";
import {usePreferredDark} from "@vueuse/core";

const settings = storeToRefs(useSettingsStore())
const isSystemDark = usePreferredDark()

const props = defineProps({
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
})

const emit = defineEmits(["update:modelValue", "blur"])

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
        onBlur: () => {
          emit("blur")
        },
      }),
    ],
  })

  editor.view = new EditorView({
    state: editor.state,
    parent: container.value,
  })

  watch(isSystemDark, () => {
    if (settings.theme.value === "system") {
      editor.view?.dispatch({
        effects: ThemeManager.reconfigure(
          isSystemDark.value ? basicDark : basicLight
        ),
      })
    }
  })

  watch(settings.theme, () => {
    switch (settings.theme.value) {
      case "dark":
        editor.view?.dispatch({
          effects: ThemeManager.reconfigure(basicDark),
        })
        break
      case "light":
        editor.view?.dispatch({
          effects: ThemeManager.reconfigure(basicLight),
        })
        break
      default:
        break
    }
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

<style>
.cm-gutters {
  background: var(--color-secondary) !important;
  border-right: 1px solid var(--color-primary) !important;
}

.cm-activeLineGutter {
  background: var(--color-primary) !important;
}

.ͼo,
.ͼ1o {
  background: none;
}
</style>
