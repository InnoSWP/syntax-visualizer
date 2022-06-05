import type { Language } from "@/core/types"
import babel from "./parsers/babel"

const javascriptLanguage: Language = {
  id: "javascript",
  uiName: "JavaScript",
  fileExtension: "js",
  iconName: undefined, // TODO: add icon
  parsers: [babel],
  sampleCode: [
    "function greet(name) {",
    '    console.log("Welcome, " + name + "!");',
    "}",
    "",
    'greet("dear explorer");',
  ],
}

export default javascriptLanguage
