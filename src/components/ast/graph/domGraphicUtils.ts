export function drawLinesFromNodeToChildrenOnSvgRecursively(
  nodeRootDiv: HTMLDivElement,
  svgToDrawOn: SVGElement
) {
  // TODO: refactor logic so this won't be calculated on each recursive call
  const { x: svgX, y: svgY } = svgToDrawOn.getBoundingClientRect()

  const children = nodeRootDiv.querySelectorAll(
    ":scope > .node-children-container > .node-root"
  ) as NodeListOf<HTMLDivElement>

  const circleOut = nodeRootDiv.querySelector(
    ":scope > .node-rect > .node-rect__circle-out"
  )

  if (!circleOut) {
    console.error(
      'TreeGraphNode root div should have a child element with class "node-rect"' +
        'with a child element with class "node-rect__circle-out"',
      nodeRootDiv
    )
    return
  }

  const { x: parentCircleX, y: parentCircleY } =
    getElementCenterCoords(circleOut)

  for (const child of children) {
    drawLinesFromNodeToChildrenOnSvgRecursively(child, svgToDrawOn)

    const circleIn = child.querySelector(
      ":scope > .node-rect > .node-rect__circle-in"
    ) as HTMLDivElement

    const { x: childCircleX, y: childCircleY } =
      getElementCenterCoords(circleIn)

    const pathData = getPathDataJoiningParentWithChild(
      -svgX + parentCircleX,
      -svgY + parentCircleY,
      -svgX + childCircleX,
      -svgY + childCircleY,
      10
    )
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", pathData)
    svgToDrawOn.appendChild(path)
  }
}

const getElementCenterCoords = (el: Element) => {
  const rect = el.getBoundingClientRect()
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  }
}

const getPathDataJoiningParentWithChild = (
  // Parent's x coordinate
  px: number,
  // Parent's y coordinate
  py: number,
  // Child's x coordinate
  cx: number,
  // Child's y coordinate
  cy: number,
  // Radius of the quadratic curve
  r: number
) => `M${px} ${py} L${px} ${cy - r} Q${px} ${cy} ${px + r} ${cy} L${cx} ${cy}`
