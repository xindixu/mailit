import PropTypes from "prop-types"
import { useWindowSize } from "react-use"
import Base from "./base"

const HEIGHT_OFFSET = 300
const MarkdownEditor = ({ value, onChange }) => {
  const { height } = useWindowSize()

  return <Base value={value} onChange={onChange} height={height - HEIGHT_OFFSET} id="content" />
}

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default MarkdownEditor
