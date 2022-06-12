<script setup lang="ts">
import { ref, computed } from "vue"
import AppTab from "@/components/AppTab.vue"
import CodeEditor from "@/components/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/AbstractSyntaxTree.vue"
import NodeCoordinatesMatrix from "@/components/NodeCoordinatesMatrix.vue"
import { useSettingsStore } from "@/stores/settings"
import languages from "@/core/languages"

const settings = useSettingsStore()

const lang = languages[settings.languageId]
const parser = lang.parsers[lang.defaultParserName]

const getLangSampleCode = (): string =>
  typeof lang.sampleCode === "string"
    ? lang.sampleCode
    : lang.sampleCode.join("\n")

const code = ref(getLangSampleCode())

const astOrError = computed(() => parser.parse(code.value))
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
      <AbstractSyntaxTree
        :variant="settings.astVariant"
        :root="astOrError?.ast?.root"
      />
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
