<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"
import AppTab from "@/components/AppTab.vue"
import AppIcon from "@/components/AppIcon.vue"
import CodeEditor from "@/components/editor/CodeEditor.vue"
import AbstractSyntaxTree from "@/components/ast/AbstractSyntaxTree.vue"
import NodeCoordinatesMatrix from "@/components/ncm/NodeCoordinatesMatrix.vue"
import { useParsingStore } from "@/stores/parsing"
import { useEditorCode } from "@/composables/useEditorCode"

const parsingStore = useParsingStore()
const { astVariant, languageId, lastNodes, error } = storeToRefs(parsingStore)
const editorCode = useEditorCode()
const highlightedNode = ref<number>()

const handleNodeMouseIn = (nodeIndex: number) => {
  highlightedNode.value = nodeIndex
}

const handleNodeMouseOut = (nodeIndex: number) => {
  if (highlightedNode.value === nodeIndex) {
    highlightedNode.value = undefined
  }
}
</script>

<template>
  <main class="tabs-root">
    <AppTab title="Code" icon="fileCode" :row="1" :col="1">
      <CodeEditor
        v-model="editorCode"
        :languageId="languageId"
        :parse-error="error ?? undefined"
        autofocus
      />
    </AppTab>
    <AppTab title="Abstract Syntax Tree" icon="tree" :row="1" :col="2">
      <AbstractSyntaxTree
        :variant="astVariant"
        :nodes="lastNodes"
        :highlight-node-index="highlightedNode"
        @node-mouse-enter="handleNodeMouseIn"
        @node-mouse-leave="handleNodeMouseOut"
      />
    </AppTab>
    <AppTab title="Node Coordinates Matrix" icon="matrix" :row="1" :col="3">
      <NodeCoordinatesMatrix
        :nodes="lastNodes"
        :highlight-node-index="highlightedNode"
        @node-mouse-enter="handleNodeMouseIn"
        @node-mouse-leave="handleNodeMouseOut"
      />
      <template v-slot:menu>
        <a
          href="https://github.com/InnoSWP/syntax-visualizer/#1"
          class="tab-menu-button"
        >
          <AppIcon name="info" />
        </a>
      </template>
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

.tab-menu-button {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color: var(--color-primary-text);
  border: none;
  outline: none;
  background-color: transparent;
}
</style>
