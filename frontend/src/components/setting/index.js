import React from "react"
import { Input, Form } from "antd"
import TagsFormItem from "./tags"

const Setting = (props) => {
  const { form } = props

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      size="default"
      form={form}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input campaign name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tags"
        name="tags"
        rules={[{ required: true, message: "Please input at least one tag!" }]}
      >
        <TagsFormItem />
      </Form.Item>
    </Form>
  )
}

export default Setting
