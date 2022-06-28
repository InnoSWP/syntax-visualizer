import { defineParser } from "@/core/types"
import type Implementation from "./implementation"

export default defineParser({
  name: "babel",
  uiName: "@babel/parser",
  loadImplementation: async () => {
    return (await import("./implementation")).default as typeof Implementation
  },
})
