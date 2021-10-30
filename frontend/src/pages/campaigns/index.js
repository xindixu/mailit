import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { useHistory } from "react-router-dom"
import { Upload, message, Card, Input, Form, Button, Table } from "antd"
import { InboxOutlined, PlusSquareOutlined } from "@ant-design/icons"

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

const SelectTemplate = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

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

const Setting = (props) => {
  const { form } = props

  useEffect(() => {
    form.setFieldsValue({
      tag: "tag",
      date: moment(),
      time: moment(),
    })
  }, [form])

  return (
    <div style={sectionStyle}>
      <Card title="Setting">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="default"
          form={form}
        >
          <Form.Item label="Tag" name="tag">
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

  const handleCreate = () => {
    history.push("/dashboard")
    form
      .validateFields()
      .then((values) => {
        // add select template before submit
        values.addition = "addition"
        console.log(values)
        // Submit values

        // submitValues(values);
      })
      .catch((errorInfo) => {})
  }

  return (
    <div>
      <div style={mainStyle}>
        <SelectTemplate />
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
