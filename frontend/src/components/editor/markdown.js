import "@remirror/styles/all.css"

import { useCallback } from "react"
import { ExtensionPriority } from "remirror"
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
} from "remirror/extensions"
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from "@remirror/react"
import { AllStyledComponent } from "@remirror/styles/emotion"

import Toolbar from "./toolbar"

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
const MarkdownEditor = ({ placeholder, initialContent, children }) => {
  const extensions = useCallback(
    () => [
      new PlaceholderExtension({ placeholder }),
      new LinkExtension({ autoLink: true }),
      new BoldExtension(),
      new StrikeExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
      new LinkExtension(),
      new BlockquoteExtension(),
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new ListItemExtension({ priority: ExtensionPriority.High, enableCollapsible: true }),
      new CodeExtension(),
      new CodeBlockExtension(),
      new TrailingNodeExtension(),
      new TableExtension(),
      new MarkdownExtension({ copyAsMarkdown: false }),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
    ],
    [placeholder]
  )

  const { manager } = useRemirror({
    extensions,
    stringHandler: "markdown",
  })

  return (
    <AllStyledComponent>
      <ThemeProvider>
        <Remirror manager={manager} autoFocus initialContent={initialContent}>
          <Toolbar />
          <EditorComponent />
          {children}
        </Remirror>
      </ThemeProvider>
    </AllStyledComponent>
  )
}

export default MarkdownEditor
