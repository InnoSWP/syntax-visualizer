<script setup lang="ts">
import { nextTick, ref } from "vue"
import AppTab from "@/components/AppTab.vue"
import CodeEditor from "@/components/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/AbstractSyntaxTree.vue"
import NodeCoordinatesMatrix from "@/components/NodeCoordinatesMatrix.vue"
import { useSettingsStore } from "@/stores/settings"
import { useParsingController } from "@/core/controller"

const { codeEditorVariant, astVariant } = useSettingsStore()

// TODO: refactor
// Set initial debounce time to zero to parse AST for the initial code immediately
const debounceTime = ref(0)
nextTick(() => {
  debounceTime.value = 300
})

const { code, ast } = useParsingController(debounceTime)
</script>

<template>
  <main class="tabs-root">
    <AppTab title="Code" :row="1" :col="1">
      <CodeEditor
        v-model:value="code"
        :variant="codeEditorVariant"
        language="typescript"
      />
    </AppTab>
    <AppTab title="AST" :row="1" :col="2">
      <AbstractSyntaxTree :variant="astVariant" :root="ast?.root" />
    </AppTab>
    <AppTab title="NCM" :row="1" :col="3">
      <NodeCoordinatesMatrix :ast="ast" />
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
