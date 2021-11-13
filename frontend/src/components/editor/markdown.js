import "@remirror/styles/all.css"

import { useCallback } from "react"
import { ExtensionPriority } from "remirror"
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from "@remirror/react"
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
  YjsExtension,
} from "remirror/extensions"
import { AllStyledComponent } from "@remirror/styles/emotion"
import { provider } from "./collaboration"
import Toolbar from "./toolbar"

const getExtensions = ({ placeholder }) => [
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
  new YjsExtension({ getProvider: () => provider }),
]

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
const MarkdownEditor = ({ placeholder, value, children, onChange }) => {
  const extensions = getExtensions({ placeholder })

  const { manager, state, setState } = useRemirror({
    extensions,
    stringHandler: "markdown",
    content: value,
  })

  return (
    <AllStyledComponent>
      <ThemeProvider>
        <Remirror
          manager={manager}
          autoFocus
          state={state}
          onChange={({ state: newState, helpers }) => {
            setState(newState)
            if (newState) {
              onChange(helpers.getMarkdown(newState))
            }
          }}
        >
          <Toolbar />
          <EditorComponent />
          {children}
        </Remirror>
      </ThemeProvider>
    </AllStyledComponent>
  )
}

export default MarkdownEditor
