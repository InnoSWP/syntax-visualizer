import { defineLanguage } from "@/core/types"
import babelParser from "./parsers/babel"

export default defineLanguage({
  id: "javascript",
  uiName: "JavaScript",
  fileExtension: "js",
  iconName: undefined, // TODO: add icon
  parsers: {
    [babelParser.name]: babelParser,
  },
  defaultParserName: babelParser.name,
  sampleCode: [
    "function greet(name) {",
    '    console.log("Welcome, " + name + "!");',
    "}",
    "",
    'greet("dear explorer");',
  ],
})
