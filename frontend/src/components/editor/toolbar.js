import React from "react"
import PropTypes from "prop-types"
import { useChainedCommands, useActive } from "@remirror/react"

const Toolbar = (props) => {
  const chain = useChainedCommands()
  const active = useActive()

  return (
    <div>
      <button
        onClick={() => {
          chain // Begin a chain
            .toggleBold()
            .focus()
            .run()
        }}
        style={{ backgroundColor: active.bold() ? "red" : "" }}
        type="button"
      >
        B
      </button>
    </div>
  )
}

Toolbar.propTypes = {}

export default Toolbar
