<script lang="ts">
import { defineComponent } from "vue"
import AppTab from "@/components/AppTab.vue"
import CodeEditor from "@/components/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/AbstractSyntaxTree.vue"
import NodeCoordinatesMatrix from "@/components/NodeCoordinatesMatrix.vue"
import { useSettingsStore } from "@/stores/settings"

export default defineComponent({
  name: "TheTabs",
  components: {
    AppTab,
    CodeEditor,
    AbstractSyntaxTree,
    NodeCoordinatesMatrix,
  },
  setup() {
    return {
      settings: useSettingsStore(),
    }
  },
})
</script>

<template>
  <main class="tabs-root">
    <AppTab title="Code" :row="1" :col="1">
      <CodeEditor :variant="settings.codeEditorVariant" />
    </AppTab>
    <AppTab title="AST" :row="1" :col="2">
      <AbstractSyntaxTree :variant="settings.astVariant" />
    </AppTab>
    <AppTab title="NCM" :row="1" :col="3">
      <NodeCoordinatesMatrix />
    </AppTab>
  </main>
</template>

<style scoped>
.tabs-root {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: [start] 33.333% [line2] 33.333% [line3] auto [end];
  grid-template-rows: [start] 100% [end];
}
</style>
