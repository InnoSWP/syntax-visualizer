<script lang="ts">
import { defineComponent } from "vue"
import AppTab from "@/components/AppTab.vue"
import CodeEditor from "@/components/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/AbstractSyntaxTree.vue"
import ParallelArray from "@/components/ParallelArray.vue"
import { useSettingsStore } from "@/stores/settings"

export default defineComponent({
  name: "TheTabs",
  components: {
    AppTab,
    CodeEditor,
    AbstractSyntaxTree,
    ParallelArray,
  },
  setup() {
    return {
      settings: useSettingsStore(),
    }
  },
})
</script>

<template>
  <main>
    <app-tab title="Code">
      <code-editor :variant="settings.codeEditorVariant" />
    </app-tab>
    <app-tab title="AST">
      <abstract-syntax-tree :variant="settings.astVariant" />
    </app-tab>
    <app-tab title="Parallel Array">
      <parallel-array />
    </app-tab>
  </main>
</template>

<style scoped></style>
