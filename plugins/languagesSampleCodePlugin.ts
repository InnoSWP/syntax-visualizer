import type { Plugin } from "rollup"
import fs from "fs"

/**
 * Rollup plugin that includes sample codes for each language in the bundle.
 */
export default function languagesSampleCodePlugin(): Plugin {
  return {
    name: "rollup-plugin-syntax-visualizer-languages-sample-code",
    resolveId(source) {
      if (isSampleCode(source)) {
        return source
      } else if (source.endsWith("?worker")) {
        return source.slice(0, -7)
      }
      return null
    },
    async load(id) {
      if (isSampleCode(id)) {
        const fileContent = fs.readFileSync(id, "utf8")
        return `export default ${JSON.stringify(fileContent)}`
      }
      return null
    },
  }
}

function isSampleCode(id: string): boolean {
  return Boolean(id.match(/\/sample\.code\.(\w+)$/))
}
