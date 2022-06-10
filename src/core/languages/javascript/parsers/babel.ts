import type { ParseResult, ParserOptions } from "@babel/parser"
import { parse as babelParse } from "@babel/parser"
import traverse, { NodePath } from "@babel/traverse"
import type { File, Node as BabelNode } from "@babel/types"
import type {
  ASTNode,
  LanguageParseFuncResult,
  ParseError,
  SourceLocation,
} from "@/core/types"
import { defineParser } from "@/core/types"

type ParserASTType = ParseResult<File>
type OptionsType = ParserOptions

export default defineParser({
  name: "@babel/parser",
  parse: parse,
})

function parse(
  code: string,
  options?: OptionsType
): LanguageParseFuncResult<ParserASTType, OptionsType> {
  let babelAst
  try {
    babelAst = babelParse(code, options)
  } catch (error) {
    return getParseErrorFromBabelParserError(error)
  }

  type BabelNodeWithCachedPath = BabelNode & { __cached_path?: string }

  const nodePathInASTToNodeMap = {} as Record<string, ASTNode>
  let root: undefined | ASTNode

  traverse(babelAst, {
    enter(path) {
      const babelNode = path.node as BabelNodeWithCachedPath
      const pathStr = getPathOfBabelNodePath(path)
      babelNode.__cached_path = pathStr
      const node = createNodeFromBabelNode(babelNode, pathStr)
      nodePathInASTToNodeMap[pathStr] = node

      // Assume that first entry is the root
      if (root == null) root = node

      const babelParent = path.parent as undefined | BabelNodeWithCachedPath
      if (babelParent?.__cached_path) {
        const parent = nodePathInASTToNodeMap[babelParent.__cached_path]
        node.parent = parent
        parent.children.push(node)
      }
    },
  })

  return {
    originalAST: babelAst,
    ast: { root },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParseErrorFromBabelParserError(error: any): ParseError {
  const message = error?.message ?? "Syntax error"
  const loc = error?.loc
  if (
    loc &&
    typeof loc.index === "number" &&
    typeof loc.start === "number" &&
    typeof loc.end === "number"
  )
    return { message, loc }
  return message
}

function getPathOfBabelNodePath(path: NodePath): string {
  const key = path.key
  const parentPath = path.parentPath
  if (key == null) {
    return ""
  } else if (parentPath == null) {
    return key.toString()
  }
  return getPathOfBabelNodePath(parentPath) + "." + key
}

const createNodeFromBabelNode = (
  babelNode: BabelNode,
  pathOriginalAST: string
): ASTNode => ({
  type: babelNode.type,
  label: getBabelNodeLabel(babelNode),
  loc: getSourceLocationFromBabelNodeLocation(babelNode),
  children: [],
  pathInOriginalAST: pathOriginalAST,
})

function getBabelNodeLabel(n: any): string | undefined {
  // const n = node as any
  if (n.value != null) {
    return typeof n.value === "string"
      ? '"' + n.value + '"'
      : n.value.toString()
  } else if (typeof n.name === "string") {
    return n.name
  } else if (typeof n.operator === "string") {
    return n.operator
  } else if (typeof n.kind === "string") {
    return n.kind
  }
}

const getSourceLocationFromBabelNodeLocation = ({
  loc,
  start,
  end,
}: BabelNode): SourceLocation => ({
  start: {
    line: loc!.start.line,
    column: loc!.start.column,
    index: start!,
  },
  end: {
    line: loc!.end.line,
    column: loc!.end.column,
    index: end!,
  },
})
