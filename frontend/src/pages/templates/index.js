import React, { useState, useCallback } from "react"
import { Form, Space, Button, Input } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import Editor from "../../components/editor"

const TEMPLATE = `
Dear {{first_name}}:

I hope that you can take a moment to rest as midterm season continues. Taking five minutes to stretch, breathe or get up for a short walk can make a big difference. Try setting a reminder or alarm on your phone and have a plan in place for what to do with your time to yourself. 

One common method that you might find helpful is the Pomodoro Method. You can use whatever segments of time work best for you, but this image will help you to understand the basic concept.


![](https://communications.universitylife.columbia.edu/sites/default/files/civicrm/persist/contribute/images/uploads/static/POMODORO_GRAPHIC_2048x2048_10cc11c5bccfb8239585cd8d58ed7acb.jpg)
`

const Templates = () => {
  const [isSaving, setIsSaving] = useState(false)

  const history = useHistory()

  const goBack = useCallback(() => {
    history.push("/")
  }, [history])

  const onFinish = useCallback(
    (values) => {
      setIsSaving(true)

      // FIXME: send request to save the updates
      setTimeout(() => {
        setIsSaving(false)
        goBack()
      }, 1000)
    },
    [goBack]
  )

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ name: "Midterm", content: TEMPLATE }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter name!" }]}
      >
        <Input placeholder="Midterm template" />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter content!" }]}
      >
        <Editor />
      </Form.Item>
      <Form.Item span={24} style={{ textAlign: "right" }}>
        <Space>
          <Button type="default" onClick={goBack}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isSaving} icon={<SaveOutlined />}>
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default Templates
