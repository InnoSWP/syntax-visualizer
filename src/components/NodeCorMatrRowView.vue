<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name : "NodeCorMatrRowView",
  //это штука принимает все ячейки талицы.
  //is_a_row - на самом деле говорит о том является ли это штука заголовком строки
  //header - название элемента кода
  //subheader - тип элемента кода
  props: ["header", 'subheader' , "is_a_row"]
})


</script>

<template>
  <!-- рендер  заголовка если это он-->
  <th v-if="is_a_row">
    <span class='sub' v-if="subheader">{{is_a_row?subheader:""}}</span>
    <br>
    <span class="hed">{{is_a_row?header:""}}</span>

  </th>
    <!-- иначе рендер обычной ячейки -->
<td v-else>{{header}}</td>
</template>

<style scoped>

  td, th {
   border: 1px solid #a9a9a9;
   padding: 3px;
   white-space: nowrap;
   }
   th
   {
     background:#fffffe
   }
    td
   {
     position: relative;
     text-align: center;
   }

  .sub {
    font-size: large;

  }
  .hed{
    font-size: small;
    font-weight: normal;
  }


</style>
