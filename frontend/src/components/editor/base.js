import React from "react"
import PropTypes from "prop-types"

import MarkdownEditor from "./markdown"
import "remirror/styles/all.css"

import Preview from "./preview"

const Base = ({ value, onChange }) => (
  <div className="remirror-theme">
    {/* the className is used to define css variables necessary for the editor */}

    <MarkdownEditor value={value} onChange={onChange}>
      <Preview />
    </MarkdownEditor>
  </div>
)

Base.propTypes = {}

export default Base
