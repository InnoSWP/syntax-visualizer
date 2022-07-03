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
  updated() {
    const subheadings: HTMLElement[] | unknown = this.$refs.subheadings
    const widthFirst: number = this.$refs.headings[0].clientWidth
    for (const subheading of subheadings) {
      subheading.style.left = widthFirst + "px"
    }
    this.$refs.upp_heading.style.left = widthFirst + "px"
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
          <div ref="upp_heading" class="upper-heading-cell">
            <div class="heading">Label</div>
          </div>
          <div
            v-for="nodeIndex in nodes[0].coordinates.length"
            v-bind:key="nodeIndex"
            class="coordinate-heading"
          >
            <div class="heading">{{ nodeIndex }}</div>
          </div>
        </div>
        <div
          v-for="(node, nodeIndex) in nodes"
          v-bind:key="nodeIndex"
          class="row"
        >
          <div ref="headings" class="heading-cell">
            <div class="heading">{{ node.type }}</div>
          </div>
          <div ref="subheadings" class="heading-cell">
            <div v-if="node.label" class="subheading">
              {{ node.label }}
            </div>
          </div>
          <div
            v-for="(coordinate, coordinateIndex) in node.coordinates"
            v-bind:key="`${nodeIndex}-${coordinateIndex}`"
            class="coordinate-cell"
          >
            <span v-if="coordinate !== 0" class="coordinate-cell-wrapper">
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
.coordinate-heading {
  display: table-cell;
  text-align: center;
}

.coordinate-heading {
  position: sticky;
  z-index: 3;
  top: 0;
  left: 0;
  border-top: 1px solid #a9a9a9;
  border-bottom: 1px solid #a9a9a9;
  background-color: white;
}

.upper-heading-cell {
  position: sticky;
  z-index: 5;
  top: 0;
  left: 0;
  border-top: 1px solid #a9a9a9;
  border-bottom: 1px solid #a9a9a9;
  background-color: white;
}

.heading-cell {
  position: sticky;
  z-index: 2;
  left: 0;
  border-top: 1px solid #a9a9a9;
  border-bottom: 1px solid #a9a9a9;
  background-color: white;
}

.heading {
  font-size: 0.875rem;
  font-weight: bold;
  z-index: 2;
  margin-right: auto;
  margin-left: auto;
  border-right: 1px solid #a9a9a9;
  border-left: 1px solid #a9a9a9;
}

.subheading {
  font-size: 0.75rem;
  font-weight: normal;
  width: max-content;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.coordinate-cell {
  font-size: 0.75rem;
  width: 0.875rem;
  height: 0.875rem;
  border: 1px solid #a9a9a9;
}

.coordinate-cell-wrapper,
.coordinate-cell-wrapper-zeroes {
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
</style>
