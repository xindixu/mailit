import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { Upload, message, Card, Input, Form, Button, Table, Tag, Tooltip } from "antd"
import { InboxOutlined, PlusSquareOutlined, PlusOutlined } from "@ant-design/icons"

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

const SelectTemplate = (props) => {
  const { selectedRowKeys, setSelectedRowKeys } = props

  const onSelectChange = (selected) => {
    setSelectedRowKeys(selected)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: true,
    type: "radio",
    selections: [Table.SELECTION_INVERT, Table.SELECTION_NONE],
  }

  return (
    <div style={sectionStyle}>
      <Card title="Choose A Template">
        <Table
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ y: 400 }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  )
}

const { Dragger } = Upload

const uploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file
    if (status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files)
  },
}

const UploadCSV = () => (
  <div style={sectionStyle}>
    <Card title="Upload CSV">
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </Dragger>
    </Card>
  </div>
)

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
    if (inputValue && tags.indexOf(inputValue) === -1) {
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
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  )
}

const Setting = (props) => {
  const { form } = props

  useEffect(() => {
    form.setFieldsValue({
      campaign_name: "",
      tag: [],
      fitst_name1: "",
      last_name1: "",
      email1: "",
      fitst_name2: "",
      last_name2: "",
      email2: "",
      fitst_name3: "",
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
          <Form.Item label="First Name" name="fitst_name1">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name1">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email1">
            <Input />
          </Form.Item>
          <Form.Item label="First Name" name="fitst_name2">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name2">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email2">
            <Input />
          </Form.Item>
          <Form.Item label="First Name" name="fitst_name3">
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
    history.push("/dashboard")
    form
      .validateFields()
      .then((values) => {
        // add select template before submit
        values.addition = "addition"
        values.selected = template[0]
        console.log(values)
        // Submit values

        // submitValues(values);
      })
      .catch((errorInfo) => {})
  }

  return (
    <div>
      <div style={mainStyle}>
        <SelectTemplate selectedRowKeys={template} setSelectedRowKeys={setTemplate} />
        <UploadCSV />
        <Setting form={form} />
      </div>
      <div style={bottomStyle}>
        <Button type="primary" icon={<PlusSquareOutlined />} onClick={handleCreate} size="large">
          Create Campaign
        </Button>
      </div>
    </div>
  )
}

Campaigns.propTypes = {}

export default Campaigns
