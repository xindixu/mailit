import React from "react"
import PropTypes from "prop-types"
import { Remirror, useRemirror } from "@remirror/react"
import { MarkdownExtension, BoldExtension, ItalicExtension } from "remirror/extensions"

import MarkdownEditor from "./markdown"
import "remirror/styles/all.css"

import Preview from "./preview"

const Base = ({ value, onChange }) => (
  <div className="remirror-theme">
    {/* the className is used to define css variables necessary for the editor */}

    <MarkdownEditor initialContent={value}>
      <Preview />
    </MarkdownEditor>
  </div>
)

Base.propTypes = {}

export default Base
