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
      matrix : [],
      maxDepth : 0,
    }
  },
  methods: {
    addVertex(node: ASTNode, depth: number) {
      this.node_names.push([node.label, node.type, depth])
      this.matrix.push([])
      //считаю максимальную глубину
      this.maxDepth = (depth > this.maxDepth )?depth:this.maxDepth
    }
  },
  computed: {
    //заполняет матрицукоординат
    createMatrix() {
      //обход дерева и получения вершин и глубин
       traverseAstPreOrder(this.ats, this.addVertex)//this.node_names.push([rootProx.heading, rootProx.subheading])
       //заполнение матрицы - пока нет, тут будет

       for (var i = 0; i < this.matrix.length; i++)
       {
           for (var j = 0; j < this.maxDepth; j++)
           {
                if(this.node_names[i][2] == j + 1)
                {
                  this.matrix[i].push(1)
                }
                else
                {
                  this.matrix[i].push(0)
                }
                console.log(this.node_names[i][2])
                if(this.node_names[i][2] > j + 1)
                  this.matrix[i][j] += this.matrix[i-1][j]
           }
       }
       //складывание матрицы

       return this.matrix.length
    },
  },
  components : {NodeCorMatrRowView}
})

</script>

<template>

<table id="matrRepresent">
  <p style='display:none'>{{createMatrix}}</p>
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
