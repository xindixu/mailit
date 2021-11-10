import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Card, Input, Form, Button, Tag, Tooltip } from "antd"
import { PlusSquareOutlined, PlusOutlined } from "@ant-design/icons"
import Csv from "../../components/csv"
import Selection from "../../components/selection"
import apiFetch from "../../lib/api-fetch"

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
  const { value, onChange } = props
  const [tags, setTags] = useState(value || [])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState("")

  const handleClose = (removedTag) => {
    const ts = tags.filter((tag) => tag !== removedTag)
    console.log(ts)
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
      <Form.Item label="First Name" name="first_name1">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="last_name1">
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email1"
        rules={[{ required: true, message: "Please input email!" }, { type: "email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="First Name" name="first_name2">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="last_name2">
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email2"
        rules={[{ required: true, message: "Please input email!" }, { type: "email" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

const columns = [
  {
    title: "Template id",
    dataIndex: "id",
  },
]

const Campaigns = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [templates, setTemplates] = useState([])
  const [template, setTemplate] = useState([0])
  const user_id = 1

  useEffect(() => {
    form.setFieldsValue({
      campaign_name: "",
      tags: [],
      first_name1: "",
      last_name1: "",
      email1: "",
      first_name2: "",
      last_name2: "",
      email2: "",
    })

    apiFetch({ route: "templates" }).then((res) => {
      const ts = res.data
      const data = ts.map((value, index) => ({ ...value, key: index }))
      setTemplates(data)
    })
  }, [])

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        // add select template before submit
        values.selected_template = templates[template[0]].id
        // Submit values
        const param = {
          name: values.campaign_name,
          user_id,
          template_id: values.selected_template,
          tags: values.tags,
        }
        apiFetch({ route: "campaigns", method: "post", params: param }).then((res) => {
          console.log(res)
        })
        // create recipient
        let recipient = {
          email: values.email1,
          tags: values.tags,
          user_id,
        }
        apiFetch({ route: "recipients", method: "post", params: recipient })
        recipient = {
          email: values.email2,
          tags: values.tags,
          user_id,
        }
        apiFetch({ route: "recipients", method: "post", params: recipient })
        history.push("/")
      })
      .catch(() => {})
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
              data={templates}
            />
          </Card>
        </div>
        <div style={sectionStyle}>
          <Csv />
        </div>
        <div style={sectionStyle}>
          <Card title="Setting">
            <Setting form={form} />
          </Card>
        </div>
      </div>
      <div style={bottomStyle}>
        <Button
          id="create_campaign"
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={handleCreate}
          size="large"
          disabled={templates.length === 0}
        >
          Create Campaign
        </Button>
      </div>
    </div>
  )
}

export default Campaigns
