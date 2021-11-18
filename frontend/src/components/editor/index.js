import { useState, useEffect, useContext } from "react"
import { WebrtcProvider } from "y-webrtc"
import * as Y from "yjs"
import PropTypes from "prop-types"
import { AuthContext } from "../../global-state"
import MarkdownEditor from "./markdown"

const Editor = ({ value, onChange, templateId }) => {
  const [provider, setProvider] = useState(null)
  const [authState] = useContext(AuthContext)

  const { name } = authState

  useEffect(() => {
    const newProvider = new WebrtcProvider(
      `mailit-tests-template-editor-${templateId}`,
      new Y.Doc()
    )
    newProvider.awareness.setLocalStateField("user", { name })
    setProvider(newProvider)

    return () => {
      if (newProvider) {
        newProvider.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId])

  return provider ? (
    <MarkdownEditor
      value={value}
      onChange={onChange}
      id="content"
      templateId={templateId}
      collaborationProvider={provider}
    />
  ) : null
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Editor
