import { ExtensionPriority } from "remirror"
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from "@remirror/react"
import {
  // Markdown
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
  // Real time collaboration
  YjsExtension,
} from "remirror/extensions"
import { AllStyledComponent } from "@remirror/styles/emotion"
import { EditorWrapper } from "./styles"
import { provider } from "./collaboration"
import Toolbar from "./toolbar"

const getExtensions = ({ placeholder }) => [
  new PlaceholderExtension({ placeholder }),
  new BlockquoteExtension(),
  new BoldExtension(),
  new BulletListExtension({ enableSpine: true }),
  new CodeBlockExtension(),
  new CodeExtension(),
  new HeadingExtension(),
  new ItalicExtension(),
  new LinkExtension(),
  new LinkExtension({ autoLink: true }),
  new ListItemExtension({ priority: ExtensionPriority.High, enableCollapsible: true }),
  new OrderedListExtension(),
  new StrikeExtension(),
  new TableExtension(),
  new TrailingNodeExtension(),
  new MarkdownExtension({ copyAsMarkdown: false }),
  /**
   * `HardBreakExtension` allows us to create a newline inside paragraphs.
   * e.g. in a list item
   */
  new HardBreakExtension(),
  new ImageExtension(),
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
    <EditorWrapper>
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

            {/* TODO: image uploader */}
            <button
              type="button"
              onClick={() => {
                manager.store.commands.insertImage({
                  src: "https://loremflickr.com/640/360",
                  width: 640,
                  height: 360,
                })
              }}
            >
              Add Image
            </button>
          </Remirror>
        </ThemeProvider>
      </AllStyledComponent>
    </EditorWrapper>
  )
}

export default MarkdownEditor
