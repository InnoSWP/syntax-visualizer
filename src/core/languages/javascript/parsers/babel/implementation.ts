import type { Node } from "@babel/types"
import type { ParserOptions } from "@babel/parser"
import { parse as babelParse } from "@babel/parser"
import type {
  LanguageParserImplementation,
  RawParseResult,
  SourceLocation,
} from "@/core/types"

export default {
  parse,
  getNodeType,
  getNodeJsonSerializableMetadata,
  getNodeLocation,
  getNodeChildren,
  getNodeLabel,
} as LanguageParserImplementation<ParserOptions, Node>

function parse(code: string, options?: ParserOptions): RawParseResult<Node> {
  try {
    return {
      success: true,
      astRoot: babelParse(code, options).program,
    }
  } catch (error) {
    return {
      success: false,
      error: parseBabelError(error),
    }
  }
}

const parseBabelError = (
  error: any
): {
  message: string
  location?: SourceLocation
} => {
  const message = error?.message ?? "Invalid syntax"

  // TODO: check whether the location of babel matches SourceLocation type
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

function getNodeType(node: Node): string {
  return node.type
}

function getNodeJsonSerializableMetadata(node: Node) {
  // TODO: implement
  return {}
}

function getNodeLocation(node: Node): SourceLocation | null {
  if (!node.loc) return null
  const { start, end } = node.loc
  return {
    start: {
      line: start.line - 1, // Babel line index starts from 1
      column: start.column,
    },
    end: {
      line: end.line - 1, // Babel line index starts from 1
      column: end.column,
    },
  }
}

function getNodeChildren(node: Node): Node[] | null {
  switch (node.type) {
    case "Program":
    case "BlockStatement":
      return node.body

    // TODO: complete this!
    //  For specification see:
    //  https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md#node-objects

    default:
      return null
  }
}

function getNodeLabel(node: Node): string | null {
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

    default:
      return null
  }
}
