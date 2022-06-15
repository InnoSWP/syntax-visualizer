<script lang="ts">
import { defineComponent } from "vue"
import NodeCorMatrRowView from "@/components/NodeCorMatrRowView.vue"
import traverseAstPreOrder from "@/core/traverse"

export default defineComponent({
  name: "NodeCoordinatesMatrix",
  data()
  {
    //в matrix хранится составленная таблица
    //в heads заголовки таблицы - первый всегда Components, далее цыфры от 1 до длины NCM
    return {  matrix:[0][0] = [[0, 1], [1, 0]],
      heads: ["Components", "1"]
    }
  },
  components : {NodeCorMatrRowView}
})

</script>


<template>
<table id="matrRepresent">
  <tr><NodeCorMatrRowView
      v-for="h of heads"
      v-bind:header="h"
      v-bind:is_a_row="true" /></tr>
  <tr><NodeCorMatrRowView
          v-for="row of matrix"
          v-bind:header="row[0]"
          v-bind:is_a_row="false" /></tr>

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
   padding: 3px
  }


</style>
