import type { DecorationSet, PluginValue, ViewUpdate } from "@codemirror/view"
import { Decoration, ViewPlugin } from "@codemirror/view"
import { Range, RangeSet, StateEffect } from "@codemirror/state"

class RangesHighlighting implements PluginValue {
  styledRanges: {
    [key in HighlightType]?: { from: number; to: number }[]
  }

  constructor() {
    this.styledRanges = {}
  }

  get decorations(): DecorationSet {
    const decorations: Range<Decoration>[] = []

    for (const [type, ranges] of Object.entries(this.styledRanges)) {
      for (const range of ranges) {
        decorations.push({
          from: range.from - 1,
          to: range.to + 1,
          value: Decoration.mark({
            inclusive: true,
            class: `${CLASS_PREFIX}_${type}` as HighlightClass,
          }),
        })
      }
    }

    return RangeSet.of<Decoration>(decorations, true)
  }

  update(update: ViewUpdate): void {
    const updatedRanges: {
      [key in HighlightType]?: { from: number; to: number }[]
    } = {}

    update.transactions.forEach((transaction) => {
      transaction.effects.forEach((effect) => {
        if (effect.is(HighlightEffect)) {
          if (!(effect.value.type in updatedRanges)) {
            updatedRanges[effect.value.type] = []
          }

          if (effect.value.loc) {
            updatedRanges[effect.value.type]?.push(effect.value.loc)
          }
        }
      })
    })

    this.styledRanges = {
      ...this.styledRanges,
      ...updatedRanges,
    }
  }
}

export const rangesHighlighting = ViewPlugin.fromClass(RangesHighlighting, {
  decorations: (value) => value.decorations,
})

export const HighlightEffect = StateEffect.define<HighlightEffectValue>()

export interface HighlightEffectValue {
  loc?: {
    from: number
    to: number
  }
  type: HighlightType
}

const CLASS_PREFIX = "codemirror-highlighted"
export type HighlightType = "highlight" | "error"
export type HighlightClass = `${typeof CLASS_PREFIX}_${HighlightType}`
