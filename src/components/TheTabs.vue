<script setup lang="ts">
import AppTab from "@/components/AppTab.vue"
import CodeEditor from "@/components/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/AbstractSyntaxTree.vue"
import NodeCoordinatesMatrix from "@/components/NodeCoordinatesMatrix.vue"
import { useSettingsStore } from "@/stores/settings"
import { ref, watch } from "vue"

const settings = useSettingsStore()
const code = ref('console.log("Hello, syntax!")')

watch(code, (newCode: string) => {
  console.log('Code updated to: "' + newCode + '"')
})
</script>

<template>
  <main class="tabs-root">
    <AppTab title="Code" :row="1" :col="1">
      <CodeEditor
        v-model:value="code"
        :variant="settings.codeEditorVariant"
        language="typescript"
      />
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
  height: calc(100% - var(--header-height));
  grid-template-columns: [start] 33.333% [line2] 33.333% [line3] auto [end];
  grid-template-rows: [start] 100% [end];
}
</style>
