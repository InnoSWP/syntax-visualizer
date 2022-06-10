export interface Language<ID extends string, ParserNames extends string> {
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
    [key in ParserNames]: LanguageParser<ParserNames, any, any>
  }

  /**
   * Name of the default parser from parsers.
   */
  readonly defaultParserName: ParserNames

  /**
   * Code example written in this language (code or array of lines of code).
   */
  readonly sampleCode: string | string[]
}

export interface LanguageParser<Name extends string, ParserAST, ParseOptions> {
  readonly name: Name
  readonly parse: LanguageParseFunc<ParserAST, ParseOptions>
}

export type LanguageParseFunc<ParserAST, ParseOptions> = (
  code: string,
  options?: ParseOptions
) => { originalAST: ParserAST; ast: AST } | ParseError

export type LanguageParseFuncResult<ParserAST, ParseOptions> = ReturnType<
  LanguageParseFunc<ParserAST, ParseOptions>
>

export type ParseError = string | { message: string; loc: SourceLocation }

export interface AST {
  root?: ASTNode
}

export interface ASTNode {
  loc: SourceLocation
  type: string
  label?: string
  parent?: ASTNode
  children: ASTNode[]
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

export function defineParser<Name extends string, ParserAST, ParseOptions>(
  parser: LanguageParser<Name, ParserAST, ParseOptions>
) {
  return parser
}

export function defineLanguage<ID extends string, ParserName extends string>(
  language: Language<ID, ParserName>
) {
  return language
}
