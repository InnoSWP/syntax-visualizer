import type { ParserOptions as BabelParserOptions } from "@babel/parser"
import { parse as babelParse } from "@babel/parser"
import traverse, { NodePath } from "@babel/traverse"
import type { Node as BabelNode } from "@babel/types"
import type { ASTNode, SourceLocation, ParseResult } from "@/core/types"
import { defineParser } from "@/core/types"

export default defineParser({
  name: "@babel/parser",
  parse: parse,
})

function parse(code: string, options?: BabelParserOptions): ParseResult {
  let babelAst
  try {
    babelAst = babelParse(code, options)
  } catch (error) {
    return { success: false, ...parseBabelError(error) }
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
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
      }
    },
  })

  return {
    success: true,
    ast: { root },
  }
}

const parseBabelError = (
  error: any
): {
  message: string
  location?: SourceLocation
} => {
  const message = error?.message ?? "Invalid syntax"

  const location = error?.loc
  if (
    location &&
    typeof location.index === "number" &&
    typeof location.start === "number" &&
    typeof location.end === "number"
  )
    return { message, location }
  return { message }
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
  pathInOriginalAST: pathOriginalAST,
})

function getBabelNodeLabel(node: BabelNode): string | undefined {
  switch (node.type) {
    case "InterpreterDirective":
    case "DirectiveLiteral":
    case "BigIntLiteral":
    case "JSXText":
      return node.value

    case "StringLiteral":
      return '"' + node.value + '"'

    case "NumericLiteral":
    case "BooleanLiteral":
      return String(node.value)

    case "RegexLiteral":
    case "RegExpLiteral":
      return `/${node.pattern}/${node.flags}`

    case "NullLiteral":
      return "null"

    case "Identifier":
    case "TypeParameter":
    case "JSXIdentifier":
    case "V8IntrinsicIdentifier":
    case "TSTypeParameter":
      return node.name

    case "VariableDeclaration":
    case "Variance":
    case "TSPropertySignature":
      return node.kind

    case "AssignmentExpression":
    case "BinaryExpression":
    case "UnaryExpression":
    case "UpdateExpression":
    case "LogicalExpression":
      return node.operator

    case "BlockStatement":
    case "ObjectExpression":
      return "{ … }"
    case "BreakStatement":
      return "break"
    case "CatchClause":
      return "catch"
    case "ConditionalExpression":
      return "… ? … : …"
    case "ContinueStatement":
      return "continue"
    case "DoWhileStatement":
      return "do while"
    case "ForInStatement":
      return "for in"
    case "ForOfStatement":
      return "for of"
    case "ForStatement":
      return "for"
    case "FunctionDeclaration":
    case "FunctionExpression":
      return "function"
    case "WhileStatement":
      return "while"
    case "WithStatement":
      return "with"
    case "AssignmentPattern":
      return "="

    case "ArrowFunctionExpression":
      return "=>"

    case "ClassDeclaration":
      return "class"

    case "ExportAllDeclaration":
      return "export {}"

    case "ExportDefaultDeclaration":
      return "export default"

    case "ImportDeclaration":
      return "import {} from"

    case "ImportDefaultSpecifier":
      return "import default from"

    case "ImportNamespaceSpecifier":
      return "import namespace from"

    case "SpreadProperty":
    case "SpreadElement":
      return "..."

    case "Super":
      return "super"

    case "YieldExpression":
      return "yield"

    case "AwaitExpression":
      return "await"

    case "IfStatement":
      return "if"

    case "MemberExpression":
      return "."

    case "ReturnStatement":
      return "return"

    case "SwitchCase":
      return "case …:"

    case "SwitchStatement":
      return "switch"

    case "ThisExpression":
      return "this"

    case "TryStatement":
      return "try"

    case "ThrowStatement":
      return "throw"

    case "AnyTypeAnnotation":
      return "any"
    case "ArrayTypeAnnotation":
      return "[]"
    case "BooleanTypeAnnotation":
      return "boolean"
    case "NullLiteralTypeAnnotation":
      return "null"

    case "TSUndefinedKeyword":
      return "undefined"

    case "TemplateElement":
      return '"' + (node.value.cooked || node.value.raw) + '"'
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
