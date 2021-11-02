import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Card, Input, Form, Button, Tag, Tooltip } from "antd"
import { PlusSquareOutlined, PlusOutlined } from "@ant-design/icons"
import Csv from "../../components/csv"
import Selection from "../../components/selection"

const mainStyle = {
  width: "100%",
  display: "inline-flex",
}

const sectionStyle = {
  isplay: "inline-block",
  width: "33%",
  marginBottom: "20px",
  padding: "10px",
}

const bottomStyle = {
  display: "table",
  alignItems: "center",
  verticalAlign: "middle",
  margin: "auto",
}

const TagsFormItem = (props) => {
  const { onChange } = props
  const [tags, setTags] = useState([])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState("")

  const handleClose = (removedTag) => {
    const ts = tags.filter((tag) => tag !== removedTag)
    console.log(ts)
    setTags({ ts })
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
      const ts = [...tags, inputValue]
      console.log(ts)
      setTags(ts)
      setInputVisible(false)
      setInputValue("")
    }
  }

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputValue("")
    setEditInputIndex(-1)
  }

  return (
    <>
      {tags.map((tag, index) => {
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

const columns = [
  {
    title: "Template Name",
    dataIndex: "template_name",
  },
]

const data = []
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    template_name: `Template ${i}`,
  })
}

const Setting = (props) => {
  const { form } = props

  useEffect(() => {
    form.setFieldsValue({
      campaign_name: "",
      tag: [],
      first_name1: "",
      last_name1: "",
      email1: "",
      first_name2: "",
      last_name2: "",
      email2: "",
      first_name3: "",
      last_name3: "",
      email3: "",
    })
  }, [form])

  return (
    <div style={sectionStyle}>
      <Card title="Setting">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="default"
          form={form}
        >
          <Form.Item label="Name" name="campaign_name">
            <Input />
          </Form.Item>
          <Form.Item label="Tags" name="tag">
            <TagsFormItem />
          </Form.Item>
          <Form.Item label="First Name" name="first_name1">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name1">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email1">
            <Input />
          </Form.Item>
          <Form.Item label="First Name" name="first_name2">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name2">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email2">
            <Input />
          </Form.Item>
          <Form.Item label="First Name" name="first_name3">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name3">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email3">
            <Input />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

const Campaigns = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [template, setTemplate] = useState([0])

  const handleCreate = () => {
    history.push("/")
    form
      .validateFields()
      .then((values) => {
        // add select template before submit
        values.selected_template = template[0]
        console.log(values)
        // Submit values

        // submitValues(values);
      })
      .catch((errorInfo) => {})
  }

  return (
    <div>
      <div style={mainStyle}>
        <div style={sectionStyle}>
          <Card title="Choose A Template">
            <Selection
              selectedRowKeys={template}
              setSelectedRowKeys={setTemplate}
              columns={columns}
              data={data}
            />
          </Card>
        </div>
        <div style={sectionStyle}>
          <Csv />
        </div>
        <Setting form={form} />
      </div>
      <div style={bottomStyle}>
        <Button
          id="create_campaign"
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={handleCreate}
          size="large"
        >
          Create Campaign
        </Button>
      </div>
    </div>
  )
}

export default Campaigns
