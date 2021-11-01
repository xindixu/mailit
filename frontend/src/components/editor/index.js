import PropTypes from "prop-types"
import { useWindowSize } from "react-use"

import MDEditor from "@uiw/react-md-editor"

const HEIGHT_OFFSET = 300
const MarkdownEditor = ({ value, onChange }) => {
  const { height } = useWindowSize()

  return <MDEditor value={value} onChange={onChange} height={height - HEIGHT_OFFSET} />
}

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MarkdownEditor
