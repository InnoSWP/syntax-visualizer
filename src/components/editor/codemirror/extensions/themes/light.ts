import { EditorView } from "@codemirror/view"
import type { Extension } from "@codemirror/state"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

const dark1 = "#3c3836",
  dark2 = "#504945",
  dark3 = "#665c54",
  dark4 = "#7c6f64",
  gray_244 = "#928374",
  light0 = "#fbf1c7",
  light1 = "#ebdbb2",
  light3 = "#bdae93",
  faded_red = "#9d0006",
  faded_green = "#79740e",
  faded_yellow = "#b57614",
  faded_blue = "#076678",
  faded_purple = "#8f3f71",
  faded_aqua = "#427b58",
  faded_orange = "#af3a03"

const bg0 = light0,
  bg1 = light1,
  bg3 = light3,
  gray = gray_244,
  fg1 = dark1,
  fg2 = dark2,
  fg3 = dark3,
  fg4 = dark4,
  red = faded_red,
  green = faded_green,
  yellow = faded_yellow,
  blue = faded_blue,
  purple = faded_purple,
  aqua = faded_aqua,
  orange = faded_orange

const invalid = red,
  darkBackground = bg1,
  highlightBackground = darkBackground,
  tooltipBackground = bg1,
  cursor = orange

/// The editor theme styles for Gruvbox Light.
export const basicLightTheme = EditorView.theme(
  {
    "&": {
      color: fg1,
      backgroundColor: bg0,
    },

    ".cm-content": {
      caretColor: cursor,
    },

    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      { backgroundColor: darkBackground },

    ".cm-panels": { backgroundColor: darkBackground, color: fg1 },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

    ".cm-searchMatch": {
      backgroundColor: bg0,
      color: yellow,
      outline: `1px solid ${bg3}`,
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: bg3,
    },

    ".cm-activeLine": { backgroundColor: highlightBackground },
    ".cm-selectionMatch": { backgroundColor: bg3 },

    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      outline: `1px solid ${bg3}`,
      fontStyle: "bold",
    },

    "&.cm-focused .cm-matchingBracket": {
      backgroundColor: bg3,
    },

    ".cm-gutters": {
      backgroundColor: bg1,
      color: fg3,
      border: "none",
    },

    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground,
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },

    ".cm-tooltip": {
      border: "none",
      backgroundColor: tooltipBackground,
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground,
        color: fg2,
      },
    },
  },
  { dark: false }
)

/// The highlighting style for code in the Gruvbox Light theme.
export const basicLightHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: red },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: aqua,
  },
  { tag: [t.variableName], color: blue },
  { tag: [t.function(t.variableName)], color: green, fontStyle: "bold" },
  { tag: [t.labelName], color: fg1 },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: purple,
  },
  { tag: [t.definition(t.name), t.separator], color: fg1 },
  { tag: [t.brace], color: fg1 },
  {
    tag: [t.annotation],
    color: invalid,
  },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: purple,
  },
  {
    tag: [t.typeName, t.className],
    color: yellow,
  },
  {
    tag: [t.operator, t.operatorKeyword],
    color: red,
  },
  {
    tag: [t.tagName],
    color: aqua,
    fontStyle: "bold",
  },
  {
    tag: [t.squareBracket],
    color: orange,
  },
  {
    tag: [t.angleBracket],
    color: blue,
  },
  {
    tag: [t.attributeName],
    color: aqua,
  },
  {
    tag: [t.regexp],
    color: aqua,
  },
  {
    tag: [t.quote],
    color: gray,
  },
  { tag: [t.string], color: fg1 },
  {
    tag: t.link,
    color: fg4,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: purple,
  },
  { tag: [t.meta], color: yellow },
  { tag: [t.comment], color: gray, fontStyle: "italic" },
  { tag: t.strong, fontWeight: "bold", color: orange },
  { tag: t.emphasis, fontStyle: "italic", color: green },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.heading, fontWeight: "bold", color: green },
  { tag: [t.heading1, t.heading2], fontWeight: "bold", color: green },
  {
    tag: [t.heading3, t.heading4],
    fontWeight: "bold",
    color: yellow,
  },
  {
    tag: [t.heading5, t.heading6],
    color: yellow,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: purple },
  {
    tag: [t.processingInstruction, t.inserted],
    color: blue,
  },
  {
    tag: [t.contentSeparator],
    color: red,
  },
  { tag: t.invalid, color: orange, borderBottom: `1px dotted ${invalid}` },
])

export const basicLight: Extension = [
  basicLightTheme,
  syntaxHighlighting(basicLightHighlightStyle),
]
