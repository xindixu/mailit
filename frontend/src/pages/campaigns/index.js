import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  List,
  Space,
  Upload,
  message,
  TimePicker,
  DatePicker,
  Card,
  Input,
  Form,
  Button,
} from "antd"
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  InboxOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons"

const listData = []
for (let i = 0; i < 10; i++) {
  listData.push({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  })
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

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

// const titleStyle = {
//   textAlign: "center",
//   marginTop: "20px",
//   marginBottom: "20px",
// }

const SelectTemplate = () => {
  return (
    <div style={sectionStyle}>
      <Card title="Choose A Template">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 3,
          }}
          dataSource={listData}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
              extra={
                <img
                  width={100}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
            </List.Item>
          )}
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

const UploadCSV = () => {
  return (
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
}

const Setting = () => {
  const [value, setValue] = useState(null)

  const onTimeChange = (time) => {
    setValue(time)
  }

  function onChange(date, dateString) {
    console.log(date, dateString)
  }

  return (
    <div style={sectionStyle}>
      <Card title="Setting">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: "default" }}
          onValuesChange={onChange}
          size="default"
        >
          <Form.Item label="Date">
            <DatePicker value={value} onChange={onChange} />
          </Form.Item>
          <Form.Item label="Time">
            <TimePicker value={value} onChange={onTimeChange} />
          </Form.Item>
          <Form.Item label="Tag">
            <Input />
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

const Campaigns = (props) => {
  return (
    <div>
      <div style={mainStyle}>
        <SelectTemplate />
        <UploadCSV />
        <Setting />
      </div>
      <div style={bottomStyle}>
        <Button type="primary" icon={<PlusSquareOutlined />} size="large">
          Create Campaign
        </Button>
      </div>
    </div>
  )
}

Campaigns.propTypes = {}

export default Campaigns
