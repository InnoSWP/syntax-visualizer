<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name : "NodeCorMatrRowView",
  props: ["header", 'subheader' , "is_a_row"]
})


</script>

<template>
  <th v-if="is_a_row">
    <span class="hed">{{is_a_row?header:""}}</span>
    <br>
    <span class='sub' v-if="subheader">{{is_a_row?subheader:""}}</span>
  </th>
<td v-else>{{is_a_row?"":header}}</td>
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

  .sub {
    font-size: small;
    font-weight: normal;
  }
  .hed{
    font-size: large
  }


</style>
