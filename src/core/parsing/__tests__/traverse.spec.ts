import { describe, expect, it } from "vitest"
import { traverseNodePreOrder } from "../traverse"

describe("traverseNodePreOrder", () => {
  it("traverses using preorder traversal", () => {
    type TestNode = {
      n: number
      children?: TestNode[]
    }
    const getChildren = (node: TestNode) => node.children

    const treesAndOrders: [TestNode, number[]][] = [
      [
        {
          n: 1,
          children: [{ n: 2, children: [{ n: 3 }, { n: 4 }] }],
        },
        [1, 2, 3, 4],
      ],
      [{ n: 500 }, [500]],
      [{ n: 1, children: [{ n: 2 }] }, [1, 2]],
      [
        {
          n: 0,
          children: [
            { n: 1, children: [{ n: 3 }, { n: 4, children: [{ n: 5 }] }] },
            { n: 2 },
          ],
        },
        [0, 1, 3, 4, 5, 2],
      ],
      [
        {
          n: 100,
          children: [
            { n: 500, children: [{ n: -300 }] },
            {
              n: 1000,
              children: [
                { n: -123, children: [{ n: -456 }] },
                { n: 5, children: [{ n: 100 }, { n: 17 }] },
              ],
            },
          ],
        },
        [100, 500, -300, 1000, -123, -456, 5, 100, 17],
      ],
    ]

    for (const [tree, expectedOrder] of treesAndOrders) {
      const actualOrder: number[] = []
      const onVisit = (node: TestNode) => {
        actualOrder.push(node.n)
      }
      traverseNodePreOrder(tree, getChildren, onVisit)

      expect(actualOrder).toEqual(expectedOrder)
    }
  })

  it("calls childrenGetter and onVisit with 1-indexed depth argument for each node", () => {
    let getChildrenCallCount = 0
    let onVisitCallCount = 0

    traverseNodePreOrder(
      1,
      (node: number) => {
        getChildrenCallCount++
        return getChildrenCallCount > 20 ? null : [node * 2]
      },
      (node, depth) => {
        onVisitCallCount++
        expect(node).toBe(Math.pow(2, depth - 1))
      }
    )

    expect(getChildrenCallCount).toBe(21)
    expect(onVisitCallCount).toBe(21)
  })
})
