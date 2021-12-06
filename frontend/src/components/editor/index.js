import { useState, useContext, useEffect } from "react"
import { WebrtcProvider } from "y-webrtc"
import * as Y from "yjs"
import PropTypes from "prop-types"
import { AuthContext } from "../../global-state"
import MarkdownEditor from "./markdown"

const Editor = ({ value, onChange, templateId }) => {
  const [authState] = useContext(AuthContext)

  const [provider, setProvider] = useState(null)
  const [sharedType, setSharedType] = useState(null)
  const { name } = authState

  useEffect(() => {
    const doc = new Y.Doc()
    const newSharedType = doc.getText("content")
    const newProvider = new WebrtcProvider(`mailit-unqiue-template-editor-${templateId}`, doc, {
      connect: false,
    })

    newProvider.awareness.setLocalStateField("user", { name })
    setProvider(newProvider)
    setSharedType(newSharedType)

    return () => {
      if (provider) {
        provider.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, templateId])

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
  templateId: PropTypes.string.isRequired,
}
export default Editor
