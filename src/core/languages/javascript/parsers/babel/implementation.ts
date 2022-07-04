import type { Node } from "@babel/types"
import type { ParserOptions } from "@babel/parser"
import { parse as babelParse } from "@babel/parser"
import type {
  LanguageParserImplementation,
  ParseError,
  Position,
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

function parse(
  code: string,
  options: ParserOptions = {}
): RawParseResult<Node> {
  try {
    return {
      success: true,
      astRoot: babelParse(code, { ...defaultOptions, ...options }).program,
    }
  } catch (error) {
    return {
      success: false,
      error: parseBabelError(error),
    }
  }
}

const defaultOptions: ParserOptions = {
  ranges: true,
  startLine: 0,
  startColumn: 0,
}

const parseBabelError = (error: any): ParseError => {
  const message = error?.message ?? "Invalid syntax"

  // TODO: check whether the location of babel matches SourceLocation type
  const location = error?.loc
  if (
    location &&
    typeof location.index === "number" &&
    typeof location.line === "number" &&
    typeof location.column === "number"
  ) {
    const position: Position = {
      index: location.index,
      line: location.line,
      column: location.column,
    }

    return {
      message,
      location: {
        start: position,
        end: position,
      },
    }
  }
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

  let from, to
  if (node.range) {
    from = node.range[0]
    to = node.range[1]
  } else if (node.start != null && node.end != null) {
    from = node.start
    to = node.end
  } else {
    return null
  }

  const { start, end } = node.loc
  return {
    start: {
      line: start.line,
      column: start.column,
      index: from,
    },
    end: {
      line: end.line,
      column: end.column,
      index: to,
    },
  }
}

function getNodeChildren(node: Node): Node[] | null {
  switch (node.type) {
    case "Program":
    case "BlockStatement":
    case "StaticBlock":
      return node.body

    case "ExpressionStatement":
      return [node.expression]

    case "WithStatement":
      return [node.object, node.body]

    case "ReturnStatement":
      return node.argument ? [node.argument] : null

    case "LabeledStatement":
      return [node.label, node.body]

    case "BreakStatement":
    case "ContinueStatement":
      return node.label ? [node.label] : null

    case "IfStatement":
      return [node.test, node.consequent, ...arr(node.alternate)]

    case "SwitchStatement":
      return [node.discriminant, ...node.cases]

    case "SwitchCase":
      return [...arr(node.test), ...node.consequent]

    case "ThrowStatement":
      return [node.argument]

    case "TryStatement":
      return [node.block, ...arr(node.handler), ...arr(node.finalizer)]

    case "CatchClause":
      return [...arr(node.param), node.body]

    case "WhileStatement":
      return [node.test, node.body]

    case "DoWhileStatement":
      return [node.body, node.test]

    case "ForStatement":
      return [
        ...arr(node.init),
        ...arr(node.test),
        ...arr(node.update),
        node.body,
      ]

    case "ForInStatement":
    case "ForOfStatement":
      return [node.left, node.right, node.body]

    case "FunctionDeclaration":
      return [...arr(node.id), ...node.params, node.body]

    case "VariableDeclaration":
      return node.declarations

    case "VariableDeclarator":
      return [node.id, ...arr(node.init)]

    case "Decorator":
      return [node.expression]

    case "Directive":
      return [node.value]

    case "ArrowFunctionExpression":
      return [...node.params, node.body]

    case "YieldExpression":
    case "AwaitExpression":
      return node.argument ? [node.argument] : null

    case "ArrayExpression":
      return filt(node.elements)

    case "ObjectExpression":
      return node.properties

    case "ObjectProperty":
      return [node.key, ...(node.decorators ?? []), node.value]

    case "ObjectMethod":
      return [node.key, ...node.params, ...(node.decorators ?? []), node.body]

    case "RecordExpression":
      return node.properties

    case "TupleExpression":
      return node.elements

    case "FunctionExpression":
      return [...arr(node.id), ...node.params, node.body]

    case "UnaryExpression":
    case "UpdateExpression":
      return [node.argument]

    case "BinaryExpression":
    case "AssignmentExpression":
    case "AssignmentPattern":
    case "LogicalExpression":
      return [node.left, node.right]

    case "SpreadElement":
      return [node.argument]

    case "MemberExpression":
    case "OptionalMemberExpression":
      return [node.object, node.property]

    case "BindExpression":
      return [...arr(node.object), node.callee]

    case "ConditionalExpression":
      return [node.test, node.consequent, node.alternate]

    case "CallExpression":
    case "OptionalCallExpression":
    case "NewExpression":
      return [node.callee, ...node.arguments]

    case "SequenceExpression":
      return node.expressions

    case "ParenthesizedExpression":
      return [node.expression]

    case "DoExpression":
      return [node.body]

    case "ModuleExpression":
      return [node.body]

    case "TemplateLiteral":
      return [...node.quasis, ...node.expressions]

    case "TaggedTemplateExpression":
      return [node.tag, node.quasi]

    case "ObjectPattern":
      return node.properties

    case "ArrayPattern":
      return filt(node.elements)

    case "RestElement":
      return [node.argument]

    case "ClassBody":
      return node.body

    case "ClassMethod":
    case "ClassPrivateMethod":
      return [node.key, ...(node.decorators ?? []), ...node.params, node.body]

    case "ClassProperty":
    case "ClassPrivateProperty":
    case "ClassAccessorProperty":
      return [node.key, ...(node.decorators ?? []), ...arr(node.value)]

    case "ClassDeclaration":
    case "ClassExpression":
      return [
        ...arr(node.id),
        ...arr(node.superClass),
        ...(node.decorators ?? []),
        node.body,
      ]

    case "MetaProperty":
      return [node.meta, node.property]

    case "ImportDeclaration":
      return [node.source, ...node.specifiers, ...(node.assertions ?? [])]

    case "ImportSpecifier":
      return [node.imported, node.local]

    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
      return [node.local]

    case "ImportAttribute":
      return [node.key, node.value]

    case "ExportNamedDeclaration":
      return [
        ...arr(node.declaration),
        ...arr(node.source),
        ...node.specifiers,
        ...(node.assertions ?? []),
      ]

    case "ExportSpecifier":
      return [node.exported, ...arr(node.local)]

    case "ExportNamespaceSpecifier":
      return [node.exported]

    case "ExportDefaultDeclaration":
      return [node.declaration]

    case "ExportAllDeclaration":
      return [node.source, ...(node.assertions ?? [])]

    default:
      return null
  }
}

const arr = <X>(x: X) =>
  (x ? [x] : []) as X extends undefined ? [] : X extends null ? [] : [X]

const filt = <X>(x: X[]) =>
  x.filter((x) => x != null) as Exclude<X, null | undefined>[]

// TODO: update according to the spec
//  See: https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md#node-objects
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
