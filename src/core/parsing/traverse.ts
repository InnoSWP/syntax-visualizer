/**
 * Traverses a node of type `N` using pre-order traversal algorithm.
 *
 * @param node The node (root) to traverse.
 * @param childrenGetter A function that accepts a node and returns its children (if any).
 * @param onVisit A function that is called on entering a node.
 * @param depth The current depth of the traversal.
 */
export function traverseNodePreOrder<N>(
  node: N,
  childrenGetter: (node: N) => N[] | null | undefined,
  onVisit: VisitNodeCallback<N>,
  depth = 1
) {
  onVisit(node, depth)
  const children = childrenGetter(node) ?? []
  for (const child of children) {
    traverseNodePreOrder(child, childrenGetter, onVisit, depth + 1)
  }
}

export type VisitNodeCallback<N> = (node: N, depth: number, parent?: N) => void
