import { defineLanguage } from "@/core/types"
import babelParser from "./parsers/babel"

export default defineLanguage({
  id: "javascript",
  uiName: "JavaScript",
  fileExtension: "js",
  iconName: undefined, // TODO: add icon
  parsers: {
    [babelParser.id]: babelParser,
  },
  defaultParserId: babelParser.id,
  codemirrorLoader: async () =>
    (await import("@codemirror/lang-javascript")).javascript(),
})
