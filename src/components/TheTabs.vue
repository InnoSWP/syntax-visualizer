<script setup lang="ts">
import { computed, type ComputedRef, ref, type Ref, watchEffect } from "vue"
import AppTab from "@/components/AppTab.vue"
import CodeEditor from "@/components/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/AbstractSyntaxTree.vue"
import NodeCoordinatesMatrix from "@/components/NodeCoordinatesMatrix.vue"
import { useSettingsStore } from "@/stores/settings"
import languages, { type LanguageID } from "@/core/languages"
import { useRoute } from "vue-router"
import type { Language, LanguageParser } from "@/core/types"
import { storeToRefs } from "pinia"
import router from "@/router"

const settings = useSettingsStore()
const { parserName, languageId } = storeToRefs(settings)
const { setLanguageId, setParserName } = settings
const route = useRoute()

function makeParserFromSettings(): LanguageParser<any, any, any> {
  return makeLanguageFromSettings().parsers[parserName.value]
}

function makeLanguageFromSettings(): Language<any, any> {
  return languages[languageId.value]
}

function makeCodeFromSettings(): string {
  let l = makeLanguageFromSettings()
  return typeof l.sampleCode === "string"
    ? l.sampleCode
    : l.sampleCode.join("\n")
}

// `any` type is definitely not the best way to do it...
const lang: Ref<Language<any, any>> = ref(makeLanguageFromSettings())
const parser: Ref<LanguageParser<any, any, any>> = ref(makeParserFromSettings())
const code: Ref<string> = ref(makeCodeFromSettings())
const astOrError: ComputedRef = computed(() => parser.value.parse(code.value))

// Get data that was shared via url.
// Backup to default values if url is empty or misses something
function setSharedDataFromUrl() {
  const queryCode = "code" in route.query ? route.query.code : null
  const queryLanguage = "lang" in route.query ? route.query.lang : null
  const queryParser = "parser" in route.query ? route.query.parser : null

  if (queryLanguage) {
    console.log(queryParser, queryLanguage, queryCode)
    setLanguageId(queryLanguage as LanguageID)
    lang.value = makeLanguageFromSettings()
  }

  if (queryParser) {
    setParserName(queryParser as string)
    parser.value = makeParserFromSettings()
  }

  if (queryCode) {
    code.value = queryCode as string
  }
}

function watchForDataChangeToUpdateUrl() {
  // Put lang, parse and code values to the url params (encoded)
  // when any of them will be changed
  watchEffect(() => {
    router.push({
      query: {
        lang: languageId.value,
        parser: parserName.value,
        code: code.value,
      },
    })
  })
}

setSharedDataFromUrl()
watchForDataChangeToUpdateUrl()
</script>

<template>
  <main class="tabs-root">
    <AppTab title="Code" :row="1" :col="1">
      <CodeEditor
        v-model:value="code"
        :variant="settings.codeEditorVariant"
        :language="languageId"
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
