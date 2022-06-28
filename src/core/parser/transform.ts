import type {
  ASTNode,
  ASTNodes,
  LanguageParserImplementation,
  ParseResult,
} from "@/core/types"
import { traverseNodePreOrder } from "@/core/traverse"

/**
 * Parses the source code using parser implementation
 * and returns the transformed ParseResult.
 * TODO: write tests
 *
 * @param parserImplementation Parser implementation.
 * @param code Source code to parse.
 * @param options Specific options for the parser.
 */
export function parse<Options>(
  parserImplementation: LanguageParserImplementation<Options, unknown>,
  code: string,
  options?: Options
): ParseResult {
  const result = parserImplementation.parse(code, options)
  console.log("Raw parser result:", result)

  if (result.success) {
    return {
      success: true,
      nodes: transformParserAst(result.astRoot, parserImplementation),
    }
  } else {
    return result
  }
}

/**
 * Given a parser's root node and implementation, generates `ASTNodes` from it.
 * TODO: write tests
 *
 * @param astRoot Root node of the AST provided by parser.
 * @param parserImplementation Parser implementation used to generate `astRoot`.
 */
function transformParserAst<ParserNode>(
  astRoot: ParserNode,
  parserImplementation: LanguageParserImplementation<any, ParserNode>
): ASTNodes {
  const {
    getNodeType,
    getNodeJsonSerializableMetadata,
    getNodeLocation,
    getNodeLabel,
    getNodeChildren,
  } = parserImplementation

  const intermediateNodes: IntermediateASTNode[] = []

  const visitNode = (node: ParserNode, depth: number) => {
    intermediateNodes.push({
      type: getNodeType(node),
      meta: getNodeJsonSerializableMetadata(node),
      depth,
      location: getNodeLocation(node) ?? undefined,
      label: getNodeLabel(node) ?? undefined,
    })
  }

  traverseNodePreOrder(astRoot, getNodeChildren, visitNode)

  console.log("Intermediate nodes:", intermediateNodes)

  completeIntermediateAstNodes(intermediateNodes)

  return intermediateNodes as ASTNodes
}

type IntermediateASTNode = Omit<ASTNode, "childrenIndexes" | "coordinates">

/**
 * Completes the intermediate AST nodes by calculating and updating
 * theirs `childrenIndexes` and `coordinates` fields.
 * TODO: write tests
 *
 * @param nodes Nodes without `childrenIndexes` and `coordinates` fields.
 */
function completeIntermediateAstNodes(nodes: IntermediateASTNode[]) {
  const maxDepth = Math.max(...nodes.map((node) => node.depth))
  const nodesCountAtDepths: number[] = Array(maxDepth).fill(0)
  const lastNodesAtDepths: Array<ASTNode | null> = Array(maxDepth).fill(null)

  for (const [index, node] of (nodes as ASTNode[]).entries()) {
    if (node.depth <= 0) {
      throw new Error(`Node depths should be 1-indexed, got ${node.depth}`)
    }

    nodesCountAtDepths[node.depth - 1]++
    node.coordinates = [
      // Add node coordinates until its depth
      ...nodesCountAtDepths.slice(0, node.depth),
      // And the remaining coordinates should be zeros
      ...Array(maxDepth - node.depth).fill(0),
    ]

    const isRoot = node.depth === 1
    if (!isRoot) {
      const parent = lastNodesAtDepths[node.depth - 2]
      if (parent == null) {
        throw new Error("Incorrect nodes, parent at previous depth is null")
      } else {
        if (!parent.childrenIndexes) parent.childrenIndexes = []
        parent.childrenIndexes.push(index)
      }
    }

    lastNodesAtDepths[node.depth - 1] = node
  }
}
