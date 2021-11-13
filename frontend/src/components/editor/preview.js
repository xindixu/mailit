import { useHelpers } from "@remirror/react"

import PropTypes from "prop-types"

const Preview = () => {
  const { getMarkdown } = useHelpers(true)

  return (
    <pre>
      <code>{getMarkdown()}</code>
    </pre>
  )
}

Preview.propTypes = {}

export default Preview
