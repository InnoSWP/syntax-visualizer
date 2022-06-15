<script lang="ts">
import { defineComponent } from "vue"
import NodeCorMatrRowView from "@/components/NodeCorMatrRowView.vue"
import { traverseAstPreOrder } from "@/core/traverse"
import type { ASTNode } from "@/core/types"
import { generateTreeGraphNodeProxyFromASTNode } from "@/components/tree-graph/tmpProxy"

export default defineComponent({
  props : {
    ats: {
      type: Object as PropType<AST>,
      required: false,
    }
  },
  name: "NodeCoordinatesMatrix",
  data()
  {
    //в matrix хранится составленная таблица
    //в node_names заголовки таблицы и глубины - первый всегда Components, далее цифры от 1 до длины NCM
    return {
      node_names : [],
      matrix:[0][0] = [[]],
    }
  },
  methods: {
    addVertex(node: ASTNode, depth: number) {
      this.node_names.push([node.label, node.type, depth])
    }
  },
  computed: {
    //заполняет матрицукоординат
    createMatrix() {
      //обход дерева и получения вершин и глубин
       traverseAstPreOrder(this.ats, this.addVertex)//this.node_names.push([rootProx.heading, rootProx.subheading])
       //заполнение матрицы - пока нет, тут будет

       return this.node_names
    },
  },
  components : {NodeCorMatrRowView}
})

</script>

<template>
  <!--отладка-->
  <p>{{createMatrix}}</p>

<table id="matrRepresent">
  <!--рендеринг строчек таблицы-->
  <template v-for="(row, index) in matrix">
    <tr>
      <!--Заголовок и подзаголовок вершины дерева -->
      <NodeCorMatrRowView
        v-bind:header="node_names[index][0]"
        v-bind:subheader="node_names[index][1]"
        v-bind:is_a_row="true" />
      <!-- строка матрицы ей соответственная-->
    <NodeCorMatrRowView
          v-for="col of row"
          v-bind:header="col"
          v-bind:is_a_row="false" />
    </tr>
  </template>

</table>
</template>

<style scoped>
  table {
   border-collapse: collapse;
   border: 3px solid #a9a9a9;
   margin: 5px;
  }
  td, th {
   border: 2px solid #a9a9a9;
   padding: 3px;
  }


</style>
