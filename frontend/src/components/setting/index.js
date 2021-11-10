import React, { useState, useEffect } from "react"
import { Input, Form, Tag, Tooltip } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const TagsFormItem = (props) => {
  const { value, onChange } = props
  const [tags, setTags] = useState(value || [])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState("")

  const handleClose = (removedTag) => {
    const ts = value.filter((tag) => tag !== removedTag)
    setTags(ts)
  }

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(tags)
    }
  }, [tags])

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      const ts = [...value, inputValue]
      setTags(ts)
      setInputVisible(false)
      setInputValue("")
    }
  }

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...value]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputValue("")
    setEditInputIndex(-1)
  }

  return (
    <>
      {(value || []).map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          )
        }
        const isLongTag = tag.length > 20

        const tagElem = (
          <Tag className="edit-tag" key={tag} closable onClose={() => handleClose(tag)}>
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputValue(tag)
                  setEditInputIndex(index)
                  e.preventDefault()
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        )
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        )
      })}
      {inputVisible && (
        <Input
          id="tag_input"
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" id="add_tag" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  )
}

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
        name="campaign_name"
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
