import React from "react"
import PropTypes from "prop-types"

import { Modal, Form, Input } from "antd"

const ImageModal = ({ onInsertImage, onCancel }) => {
  const [form] = Form.useForm()

  return (
    // TODO: image uploader
    <Modal
      title="Insert an Image"
      visible
      okText="Insert"
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then(({ src }) => {
            onInsertImage(src)
          })
          .catch((info) => {
            console.error("Validate Failed:", info)
          })
      }}
      onCancel={onCancel}
    >
      <Form name="insert-image" form={form} autoComplete="off" layout="vertical">
        <Form.Item
          label="Image Link"
          name="src"
          rules={[
            { required: true, message: "Please input the link to your image" },
            {
              type: "url",
              message: `Link must starts with "http://" or "https://"`,
            },
          ]}
        >
          <Input placeholder="https://" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

ImageModal.propTypes = {
  onInsertImage: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ImageModal
