<script lang="ts">
import { defineComponent } from "vue"
import type { PropType } from "vue"
import { traverseAstPreOrder } from "@/core/traverse"
import type { AST, ASTNode } from "@/core/types"

interface NCMNode {
  heading: string
  subheading?: string
  depth: number
  coordinates: number[]
}

export default defineComponent({
  name: "NodeCoordinatesMatrix",
  props: {
    ast: {
      type: Object as PropType<AST>,
      required: false,
    },
  },
  computed: {
    matrix() {
      if (!this.ast) {
        return
      }

      let maxDepth = 0
      const nodes: NCMNode[] = []

      const addVertex = (node: ASTNode, depth: number) => {
        nodes.push({
          heading: node.type,
          subheading: node.label,
          depth: depth,
          coordinates: [],
        })
        maxDepth = Math.max(depth, maxDepth)
      }

      traverseAstPreOrder(this.ast, addVertex)

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        for (let j = 0; j < maxDepth; j++) {
          const coordinate = node.depth == j + 1 ? 1 : 0
          node.coordinates.push(coordinate)

          if (i > 0 && node.depth >= j + 1) {
            node.coordinates[j] += nodes[i - 1].coordinates[j]
          }
        }
      }

      return nodes
    },
  },
})
</script>

<template>
  <div class="wrapper">
    <table class="table">
      <tbody class="table-body">
        <tr
          v-for="(node, nodeIndex) in matrix"
          v-bind:key="nodeIndex"
          class="row"
        >
          <th class="heading-cell">
            <span class="heading">{{ node.heading }}</span>
            <span v-if="node.subheading" class="subheading">
              {{ node.subheading }}
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
  background-color: #efefef;
}

.table {
  position: absolute;
  border-collapse: collapse;
  /*border: 2px solid #a9a9a9;*/
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
