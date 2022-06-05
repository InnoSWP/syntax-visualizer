export interface Language {
  /**
   * Unique language identifier.
   */
  id: string

  /**
   * Human-readable language name.
   */
  uiName: string

  /**
   * File extension (without a dot ".") of code written in this language.
   */
  fileExtension: string

  /**
   * Name of the language icon component.
   */
  iconName?: string

  /**
   * Parsers that implement this language parsing logic.
   */
  parsers: LanguageParser<object, object>[]

  /**
   * Code example written in this language (code or array of lines of code).
   */
  sampleCode: string | string[]
}

export interface LanguageParser<ParserAST, ParseOptions> {
  name: string
  parse: LanguageParseFunc<ParserAST, ParseOptions>
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

export type FlatAST = ASTNode[]

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
