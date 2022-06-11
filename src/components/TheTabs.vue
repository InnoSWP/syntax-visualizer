<script setup lang="ts">
import { ref, watch } from "vue"
import AppTab from "@/components/AppTab.vue"
import CodeEditor from "@/components/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/AbstractSyntaxTree.vue"
import NodeCoordinatesMatrix from "@/components/NodeCoordinatesMatrix.vue"
import { useSettingsStore } from "@/stores/settings"
import languages from "@/core/languages"

const settings = useSettingsStore()

const lang = languages[settings.languageId]
const parser = lang.parsers[lang.defaultParserName]
const parse = (code: string) => parser.parse(code)

const getLangSampleCode = () =>
  typeof lang.sampleCode === "string"
    ? lang.sampleCode
    : lang.sampleCode.join("\n")

const code = ref(getLangSampleCode())

let ast = ref(parse(code.value))

watch(code, (newCode: string) => {
  ast.value = parse(newCode)
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
      <AbstractSyntaxTree :variant="settings.astVariant" :ast="ast.ast" />
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
