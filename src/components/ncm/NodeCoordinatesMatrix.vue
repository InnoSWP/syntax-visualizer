<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import type { ASTNodes } from "@/core/types"

export default defineComponent({
  name: "NodeCoordinatesMatrix",
  props: {
    nodes: {
      type: Array as PropType<ASTNodes>,
      required: false,
    },
  },
})
</script>

<template>
  <div class="wrapper">
    <table class="table" aria-label="Node Coordinates Matrix">
      <tbody class="table-body">
        <tr
          v-for="(node, nodeIndex) in nodes"
          v-bind:key="nodeIndex"
          class="row"
        >
          <th class="heading-cell">
            <span class="heading">{{ node.type }}</span>
            <span v-if="node.label" class="subheading">
              {{ node.label }}
            </span>
          </th>

          <td
            v-for="(coordinate, coordinateIndex) in node.coordinates"
            v-bind:key="`${nodeIndex}-${coordinateIndex}`"
            class="coordinate-cell"
          >
            <span class="coordinate-cell-wrapper">
              {{ coordinate }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.table {
  position: absolute;
  border-collapse: collapse;
}

.table-body {
  display: block;
  overflow: auto;
}

.heading-cell,
.coordinate-cell {
  border: 1px solid #a9a9a9;
}

.heading-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.heading {
  font-size: 0.875rem;
  font-weight: bold;
}

.subheading {
  font-size: 0.75rem;
  font-weight: normal;
}

.coordinate-cell {
  font-size: 0.75rem;
}

.coordinate-cell-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  min-height: 16px;
}
</style>
