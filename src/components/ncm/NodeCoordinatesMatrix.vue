<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import type { ASTNodes } from "@/core/types"


export default defineComponent({
  name: "NodeCoordinatesMatrix",
  props: {
    nodes: {
      type: Array as PropType<ASTNodes | null>,
      required: false,
    },
  },
})
</script>

<template>
  <div class="wrapper">
    <div
      v-if="nodes && nodes.length > 0"
      class="table"
      aria-label="Node Coordinates Matrix"
    >
      <div class="table-body">
        <div class="row">
          <div class="upper-heading-cell">
            <div class="heading">Type</div>
          </div>
          <div class="upper-subheading-cell">
            <div style="max-width: 100px;" class="heading">Label</div>
          </div>
          <div
            v-for="nodeIndex in nodes[0].coordinates.length"
            v-bind:key="nodeIndex"
            class="coordinate-heading-cell"
          >
            <div class="coordinate-heading">{{ nodeIndex }}</div>
          </div>
        </div>
        <div
          v-for="(node, nodeIndex) in nodes"
          v-bind:key="nodeIndex"
          class="row"
        >
          <div class="heading-cell" v-bind:title=node.type>
            <div class="heading">{{ node.type }}</div>
          </div>
          <div class="subheading-cell" v-bind:title=node.label>
            <div class="subheading">{{ node.label }}</div>
          </div>
          <div
            v-for="(coordinate, coordinateIndex) in node.coordinates"
            v-bind:key="`${nodeIndex}-${coordinateIndex}`"
            class="coordinate-cell"
          >
            <span v-if="node.depth === coordinateIndex + 1"
                  class="coordinate-cell-wrapper-depth">
              {{ coordinate }}
            </span>
            <span v-else-if="coordinate !== 0" class="coordinate-cell-wrapper">
              {{ coordinate }}
            </span>
            <span v-else class="coordinate-cell-wrapper-zeroes">
              {{ coordinate }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
  margin-left: 5px;
}

.table {
  position: absolute;
  display: table;
  border-collapse: collapse;
}

.table-body {
  display: table-row-group;
  overflow: auto;
}

.row {
  display: table-row;
}

.upper-heading-cell,
.heading-cell,
.coordinate-cell,
.coordinate-heading-cell,
.subheading-cell,
.upper-subheading-cell {
  display: table-cell;
  text-align: center;
}

.coordinate-heading-cell {
  position: sticky;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: white;
}

.coordinate-heading {
  height: 34px;
  width: 34px;
  font-size: 0.875rem;
  text-align: center;
  font-weight: bold;
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px;
  border-right: 1px solid #a9a9a9;
  border-bottom: 1px solid #a9a9a9;
  background-color: var(--color-primary);
}

.upper-heading-cell,
.upper-subheading-cell {
  position: sticky;
  z-index: 5;
  top: 0;
  left: 0;
  background-color: var(--color-primary);
}

.upper-subheading-cell {
  left: 150px;
  max-width: 100px;
}

.heading-cell,
.subheading-cell {
  width: 150px;
  position: sticky;
  z-index: 2;
  left: 0;
  background-color: var(--color-primary);
}


.heading-cell {
  left: 0;
}

.subheading-cell {
  left: 150px;
  max-width: 100px;
  border-bottom: 1px solid #a9a9a9;
}

.heading {
  height: auto;
  font-size: 0.875rem;
  text-align: center;
  font-weight: bold;
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px;
  width: 150px;
  border-right: 1px solid #a9a9a9;
  border-bottom: 1px solid #a9a9a9;
}

.subheading {
  height: content-box;
  max-width: 100px;
  font-size: 0.75rem;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px;
}

.coordinate-cell {
  font-size: 0.75rem;
  width: 0.875rem;
  height: 0.875rem;
  border: 1px solid #a9a9a9;
}

.coordinate-cell-wrapper,
.coordinate-cell-wrapper-zeroes,
.coordinate-cell-wrapper-depth {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  min-height: 16px;
  text-align: center;
}

.coordinate-cell-wrapper-zeroes {
  opacity: 0.5;
}

.coordinate-cell-wrapper-depth {
  font-weight: bold;
}
</style>
