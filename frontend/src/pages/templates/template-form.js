import React from "react"
import PropTypes from "prop-types"
import { Form, Space, Button, Input } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import Editor from "../../components/editor"

const TemplateForm = ({ onFinish, template, onCancel, isSaving }) => (
  <Form onFinish={onFinish} layout="vertical" initialValues={template}>
    <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter name!" }]}>
      <Input placeholder="Midterm template" />
    </Form.Item>
    <Form.Item
      label="Markdown"
      name="markdown"
      rules={[{ required: true, message: "Please enter markdown content!" }]}
    >
      <Editor />
    </Form.Item>
    <Form.Item span={24} style={{ textAlign: "right" }}>
      <Space>
        <Button type="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={isSaving} icon={<SaveOutlined />}>
          Update
        </Button>
      </Space>
    </Form.Item>
  </Form>
)

TemplateForm.propTypes = {}

export default TemplateForm
