import PropTypes from "prop-types"
import MDEditor from "@uiw/react-md-editor"

const HEIGHT = 1000
const MarkdownEditor = ({ value, onChange }) => (
  <MDEditor value={value} onChange={onChange} height={HEIGHT} />
)

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MarkdownEditor
