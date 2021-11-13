import "@remirror/styles/all.css"
import styled from "styled-components"

export const EditorWrapper = styled.div.attrs({
  className: "remirror-theme",
})`
  &&& {
    .remirror-toolbar {
      background-color: transparent;
    }

    .remirror-editor {
      background-color: white;
    }
  }
`
