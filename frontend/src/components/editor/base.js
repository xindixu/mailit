import React from "react"
import PropTypes from "prop-types"
import { EditorComponent, Remirror, useRemirror } from "@remirror/react"
import { BoldExtension, ItalicExtension } from "remirror/extensions"

import "remirror/styles/all.css"
import Toolbar from "./toolbar"

const Base = ({ value, onChange }) => {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension(), new ItalicExtension()],
    content: value,
    selection: "start",
    stringHandler: "html",
  })
  return (
    <div className="remirror-theme">
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state}>
        <Toolbar />
        <EditorComponent />
      </Remirror>
    </div>
  )
}

Base.propTypes = {}

export default Base
