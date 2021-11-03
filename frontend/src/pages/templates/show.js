import React, { useState, useEffect, useCallback } from "react"
import { Form, Space, Button, Input, Spin } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import { useHistory, useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import Editor from "../../components/editor"
import apiFetch from "../../lib/api-fetch"

const TemplateShow = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [template, setTemplate] = useState({})
  const { id } = useParams()

  useEffect(() => {
    apiFetch({ route: `templates/${id}` }).then(({ data }) => {
      setTemplate({ ...data.attributes })
    })
  }, [id])

  const history = useHistory()

  const goBack = useCallback(() => {
    history.push("/")
  }, [history])

  const onFinish = useCallback(
    (values) => {
      setIsSaving(true)

      apiFetch({
        route: `templates/${id}`,
        method: "patch",
        params: { ...values, user_id: 1, collaborator_ids: [1] },
      }).then(({ status }) => {
        if (status === 200) {
          setIsSaving(false)
          goBack()
        }
      })
    },
    [goBack, id]
  )

  return isEmpty(template) ? (
    <Spin />
  ) : (
    <Form onFinish={onFinish} layout="vertical" initialValues={template}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter name!" }]}
      >
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

export default TemplateShow
