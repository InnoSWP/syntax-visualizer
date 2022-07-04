import type { Ref } from "vue"
import { ref } from "vue"
import type { MaybeRef } from "@vueuse/core"
import { watchThrottled } from "@vueuse/core"

/**
 * Returns ref to debounce time that dynamically changes basing on text size.
 *
 * @param text Text to watch, basing on which debounce time will be calculated.
 * @param thresholds Text size/debounce time thresholds.
 * @param throttle Text watching throttle time.
 */
export function useDebounceTimeBasedOnTextSize(
  text: Ref<string>,
  thresholds: TextDebounceTimeThresholds,
  throttle: MaybeRef<number> = 2000
) {
  const debounceTime = ref(0)

  watchThrottled(
    text,
    () => {
      debounceTime.value = getDebounceTimeForText(text.value, thresholds)
    },
    { throttle }
  )

  return debounceTime
}

function getDebounceTimeForText(
  text: string,
  thresholds: TextDebounceTimeThresholds
) {
  const size = text.length
  for (const [maxSize, debounceTime] of thresholds) {
    if (size <= maxSize) return debounceTime
  }
  return thresholds[thresholds.length - 1][0]
}

export type TextDebounceTimeThresholds = [
  [MaxSize, DebounceTimeMs],
  ...[MaxSize, DebounceTimeMs][]
]
export type MaxSize = number
export type DebounceTimeMs = number
