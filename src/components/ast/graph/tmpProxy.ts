import type { ASTNode } from "@/core/types"
import type { TreeNode } from "@/components/ast/graph/types"

let idCounter = 0

export function generateTreeGraphNodeProxyFromASTNode(node: ASTNode) {
  const proxyHandler = {
    children: undefined as TreeNode[] | undefined,
    id: idCounter++,
    get(target: ASTNode, prop: string): any {
      switch (prop) {
        case "children":
          if (!this.children) {
            this.children = (target.children ?? []).map(
              generateTreeGraphNodeProxyFromASTNode
            )
          }
          return this.children
        case "heading":
          return target.type
        case "subheading":
          return target.label
        case "id":
          return this.id
      }

      return Reflect.get(target, prop)
    },
  }

  return new Proxy(node, proxyHandler) as any as TreeNode
}
