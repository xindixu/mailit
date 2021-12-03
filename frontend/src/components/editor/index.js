import { useMemo, useContext } from "react"
import { WebrtcProvider } from "y-webrtc"
import * as Y from "yjs"
import PropTypes from "prop-types"
import { AuthContext } from "../../global-state"
import MarkdownEditor from "./markdown"

const Editor = ({ value, onChange, templateId }) => {
  const [authState] = useContext(AuthContext)

  const { name } = authState

  const { sharedType, provider } = useMemo(() => {
    const doc = new Y.Doc()
    const sharedType = doc.getText("content")
    const provider = new WebrtcProvider(`mailit-tests-template-editor-${templateId}`, doc, {
      connect: false,
    })

    provider.awareness.setLocalStateField("user", { name })
    return { doc, sharedType, provider }
  }, [templateId])

  return provider ? (
    <MarkdownEditor
      value={value}
      onChange={onChange}
      id="content"
      templateId={templateId}
      collaborationProvider={provider}
      sharedType={sharedType}
    />
  ) : null
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Editor
