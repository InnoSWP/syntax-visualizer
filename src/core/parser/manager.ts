import type { ParseResult } from "@/core/types"
import type { FullParserName } from "@/core/languages"
import type { WorkerRequestSetParser, WorkerResponse } from "./types"
import ParserWorker from "./worker?worker"

let codeVersionCounter = 0

export class ParserWorkerManager {
  worker: Worker
  parsePromise: ParsePromise | null = null

  constructor(defaultLanguageParserName: FullParserName) {
    this.worker = new ParserWorker()
    this.worker.onmessage = this.handleWorkerResponse.bind(this)
    this.worker.onerror = this.handleWorkerError.bind(this)

    if (defaultLanguageParserName != null) {
      this.setParser(defaultLanguageParserName)
    }
  }

  parse(code: string): [number, Promise<ParseResult>] {
    const version = codeVersionCounter++

    this.worker.postMessage({ type: "parse", version, code })

    this.parsePromise = { codeVersion: version }

    const parsePromise = new Promise<ParseResult>((resolve) => {
      if (this.parsePromise != null && this.parsePromise.resolve == null) {
        this.parsePromise.resolve = resolve
      }
    })

    return [version, parsePromise]
  }

  setParser(fullParserName: FullParserName) {
    const request: WorkerRequestSetParser = {
      type: "set-parser",
      parser: fullParserName,
    }
    this.worker.postMessage(request)
  }

  private handleWorkerResponse(event: MessageEvent) {
    const data = event.data as WorkerResponse
    console.log("Worker sent message:\n", data)

    switch (data.type) {
      case "parse-result":
        if (this.parsePromise?.codeVersion === data.version) {
          this.parsePromise.resolve?.(data.result)
          this.parsePromise = null
        }
        break
      default:
        console.warn("Unknown message received from worker", data)
    }
  }

  private handleWorkerError(error: ErrorEvent) {
    console.error("Error in parser worker", error)
  }
}

interface ParsePromise {
  codeVersion: number
  resolve?: (result: ParseResult) => void
}
