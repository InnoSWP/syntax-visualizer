import type { LanguageSupport } from "@codemirror/language"

export interface Language<
  ID extends Readonly<string>,
  ParserName extends Readonly<string>
> {
  /**
   * Unique language identifier.
   * Important: should match the name of the folder containing the language.
   * Important: symbol ">" is forbidden.
   */
  readonly id: ID

  /**
   * Human-readable language name.
   */
  readonly uiName: string

  /**
   * File extension (without a dot ".") of code written in this language.
   */
  readonly fileExtension: string

  /**
   * Name of the language icon component.
   */
  readonly iconName?: string

  /**
   * Parsers that implement this language parsing.
   * In the format: { parserName: parser }
   */
  readonly parsers: {
    [key in ParserName]: LanguageParser<key, any, any>
  }

  /**
   * Name of the default parser from parsers.
   */
  readonly defaultParserName: ParserName

  /**
   * Async function that loads the codemirror support for this language.
   */
  readonly codemirrorLoader?: () => Promise<LanguageSupport>
}

export interface LanguageParser<
  Name extends Readonly<string>,
  ParserOptions,
  ParserASTNode
> {
  /**
   * Unique for the language name of the parser.
   * Important: symbol ">" is forbidden.
   */
  readonly name: Name
  readonly uiName: string
  readonly loadImplementation: () => Promise<
    LanguageParserImplementation<ParserOptions, ParserASTNode>
  >
}

export interface LanguageParserImplementation<ParserOptions, ParserASTNode> {
  /**
   * Parses the given code and returns the root node
   * of the AST (in parer's specific format).
   *
   * @param code Source code to parse.
   * @param options Specific parser options.
   */
  parse: (
    code: string,
    options?: ParserOptions
  ) => RawParseResult<ParserASTNode>

  getNodeType: (node: ParserASTNode) => string
  getNodeJsonSerializableMetadata: (node: ParserASTNode) => Record<string, any>
  getNodeLocation: (node: ParserASTNode) => SourceLocation | null
  getNodeLabel: (node: ParserASTNode) => string | null
  getNodeChildren: (node: ParserASTNode) => ParserASTNode[] | null
}

export type RawParseResult<ParserASTNode> =
  | RawSuccessParseResult<ParserASTNode>
  | RawFailedParseResult

export interface RawSuccessParseResult<ParserASTNode> {
  success: true
  astRoot: ParserASTNode
}

export interface RawFailedParseResult {
  success: false
  error: ParseError
}

export interface ParseError {
  message: string
  location?: SourceLocation
}

export interface SourceLocation {
  start: Position
  end: Position
}

export interface Position {
  line: number
  column: number
  index?: number
}

export type ParseResult = SuccessParseResult | FailedParseResult

export interface SuccessParseResult {
  success: true
  nodes: ASTNodes
}

export interface FailedParseResult {
  success: false
  error: ParseError
}

/**
 * Nodes of the AST. First entry (if present) is the root node.
 */
export type ASTNodes = ASTNode[]

export interface ASTNode {
  /**
   * Type of the node (i.e. `StringLiteral`).
   */
  type: string

  /**
   * Original metadata of the node provided by parser.
   * _**Important:** it should be JSON-serializable._
   */
  meta: Record<string, any>

  /**
   * Depth of the node in the AST (indexing from 1).
   */
  depth: number

  /**
   * Location of the node in the source code.
   */
  location?: SourceLocation

  /**
   * Value or some human-readable label of the node.
   *
   * _For example, for a `StringLiteral` node, the label is the string value._
   */
  label?: string

  /**
   * Indexes of the child nodes of the node.
   */
  childrenIndexes?: number[]

  /**
   * Coordinates of the node in the NCM.
   */
  coordinates: number[]
}

export function defineParser<
  Name extends Readonly<string>,
  ParserOptions,
  ParserASTNode
>(
  parser: LanguageParser<Name, ParserOptions, ParserASTNode>
): LanguageParser<Name, ParserOptions, ParserASTNode> {
  return parser
}

export function defineLanguage<
  ID extends Readonly<string>,
  ParserName extends string
>(language: Language<ID, ParserName>): Language<ID, ParserName> {
  return language
}
