import PropTypes from "prop-types"
import { useWindowSize } from "react-use"
import MarkdownEditor from "./markdown"

const HEIGHT_OFFSET = 300

const Editor = ({ value, onChange }) => {
  const { height } = useWindowSize()

  return <Editor value={value} onChange={onChange} id="content" />
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MarkdownEditor
