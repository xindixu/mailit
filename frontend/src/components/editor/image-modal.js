import React, { useState } from "react"
import PropTypes from "prop-types"

import { Modal, Input } from "antd"

const ImageModal = ({ onOk, onCancel }) => {
  const [link, setLink] = useState("")
  return (
    // TODO: image uploader
    <Modal title="Insert an Image" visible onOk={() => onOk(link)} onCancel={onCancel}>
      <Input
        placeholder="https://"
        value={link}
        onChange={({ target: { value } }) => setLink(value)}
      />
    </Modal>
  )
}

ImageModal.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ImageModal
