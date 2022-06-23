export interface Language<
  ID extends Readonly<string>,
  ParserName extends Readonly<string>
> {
  /**
   * Unique language identifier.
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
   * Parsers that implement this language parsing to AST.
   * In the format: { parserName: parser }
   */
  readonly parsers: {
    [key in ParserName]: LanguageParser<ParserName, any>
  }

  /**
   * Name of the default parser from parsers.
   */
  readonly defaultParserName: ParserName
}

export interface LanguageParser<Name extends Readonly<string>, ParseOptions> {
  readonly name: Name
  readonly parse: ParserFunc<ParseOptions>
}

export type ParserFunc<ParseOptions> = (
  code: string,
  options?: ParseOptions
) => ParseResult

export type ParseResult = SuccessParseResult | FailedParseResult

export interface SuccessParseResult {
  success: true
  ast: AST
}

export interface FailedParseResult {
  success: false
  error: ParseError
}

export interface ParseError {
  message: string
  location?: SourceLocation
}

export interface AST {
  root?: ASTNode
}

export interface ASTNode {
  loc: SourceLocation
  type: string
  label?: string
  parent?: ASTNode
  children?: ASTNode[]
  pathInOriginalAST: string
}

export interface SourceLocation {
  start: Position
  end: Position
}

export interface Position {
  line: number
  column: number
  index: number
}

export function defineParser<Name extends string, ParseOptions>(
  parser: LanguageParser<Name, ParseOptions>
) {
  return parser
}

export function defineLanguage<ID extends string, ParserName extends string>(
  language: Language<ID, ParserName>
) {
  return language
}
