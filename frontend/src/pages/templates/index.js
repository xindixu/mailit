import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { Space, Button, Row } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
import Editor from "../../components/editor"

const Templates = (props) => {
  const [isSaving, setIsSaving] = useState(false)
  const history = useHistory()

  const goBack = useCallback(() => {
    history.push("/")
  }, [history])

  const save = useCallback(() => {
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      goBack()
    }, 1000)
  }, [goBack])

  return (
    <>
      <Space direction="vertical">
        <Editor />
        <Row justify="end">
          <Space>
            <Button type="default" onClick={goBack}>
              Cancel
            </Button>
            <Button type="primary" onClick={save} icon={<SaveOutlined />} loading={isSaving}>
              Save
            </Button>
          </Space>
        </Row>
      </Space>
    </>
  )
}

Templates.propTypes = {}

export default Templates
