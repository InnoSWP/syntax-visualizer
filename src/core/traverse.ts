import type { AST, ASTNode } from "@/core/types"

export type TraverseCallbackFn = (node: ASTNode, depth: number) => void

function traverseNodePreOrder(
  node: ASTNode,
  callback: TraverseCallbackFn,
  depth: number
) {
  callback(node, depth)
  for (const child of node.children ?? []) {
    traverseNodePreOrder(child, callback, depth + 1)
  }
}

export function traverseAstPreOrder(ast: AST, callback: TraverseCallbackFn) {
  if (!ast.root) return
  traverseNodePreOrder(ast.root, callback, 1)
}
