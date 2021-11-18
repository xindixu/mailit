import { useState, useCallback, useRef, useEffect } from "react"
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
  AnnotationExtension,
} from "remirror/extensions"
import { AllStyledComponent } from "@remirror/styles/emotion"

import { EditorWrapper } from "./styles"
import Toolbar from "./toolbar"
import ImageModal from "./image-modal"
import useObserver from "./hooks/useObserver"

const DELAY = 1000

const getExtensions = ({ placeholder, collaborationProvider }) => [
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
  new YjsExtension({ getProvider: () => collaborationProvider }),
  new AnnotationExtension(),
]

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
const MarkdownEditor = ({ placeholder, value, children, onChange, collaborationProvider }) => {
  const [showImageModal, setShowImageModal] = useState(false)
  const [clientCount, setClientCount] = useState(0)
  const usedFallbackRef = useRef(false)

  const extensions = getExtensions({
    placeholder,
    collaborationProvider,
  })

  const { manager, getContext } = useRemirror({
    extensions,
    stringHandler: "markdown",
  })

  const handlePeersChange = useCallback(
    ({ webrtcPeers }) => {
      setClientCount(webrtcPeers.length)
    },
    [setClientCount]
  )

  useObserver("peers", handlePeersChange, collaborationProvider)

  const handleChange = useCallback(({ state, helpers }) => {
    if (state) {
      onChange(helpers.getMarkdown(state))
    }
  }, [])

  useEffect(() => {
    if (usedFallbackRef.current) return

    const fetchFallback = () => {
      if (clientCount === 0) {
        getContext()?.setContent(value)
      }
      usedFallbackRef.current = true
    }

    const timeoutId = window.setTimeout(fetchFallback, DELAY)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <EditorWrapper>
      <AllStyledComponent>
        <ThemeProvider>
          <Remirror manager={manager} autoFocus onChange={handleChange}>
            <Toolbar onClickInsertImage={() => setShowImageModal(true)} />
            <EditorComponent />
            {children}
            client online: {clientCount}
            {showImageModal && (
              <ImageModal
                onInsertImage={(src) => {
                  manager.store.commands.insertImage({
                    src,
                  })
                  setShowImageModal(false)
                }}
                onCancel={() => setShowImageModal(false)}
              />
            )}
          </Remirror>
        </ThemeProvider>
      </AllStyledComponent>
    </EditorWrapper>
  )
}

export default MarkdownEditor
