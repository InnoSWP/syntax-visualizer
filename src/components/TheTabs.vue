<script setup lang="ts">
import { nextTick, ref } from "vue"
import AppTab from "@/components/AppTab.vue"
import CodeEditor from "@/components/editor/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/ast/AbstractSyntaxTree.vue"
import NodeCoordinatesMatrix from "@/components/ncm/NodeCoordinatesMatrix.vue"
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
    <AppTab title="Code" icon="fileCode" :row="1" :col="1">
      <CodeEditor
        v-model:value="code"
        :variant="codeEditorVariant"
        language="typescript"
      />
    </AppTab>
    <AppTab title="Abstract Syntax Tree" icon="tree" :row="1" :col="2">
      <AbstractSyntaxTree :variant="astVariant" :root="ast?.root" />
    </AppTab>
    <AppTab title="Node Coordinates Matrix" icon="matrix" :row="1" :col="3">
      <NodeCoordinatesMatrix :ast="ast" />
    </AppTab>
  </main>
</template>

<style scoped>
.tabs-root {
  display: grid;
  width: 100%;
  height: calc(100% - var(--header-height));
  grid-template-columns: [start] 33.333% [line2] 33.333% [line3] 33.333% [end];
  grid-template-rows: [start] 100% [end];
}
</style>
