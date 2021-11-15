import React, { useContext } from "react"
import { Upload, message, Card } from "antd"
import { InboxOutlined } from "@ant-design/icons"
import { AuthContext } from "../../globalState"

const { Dragger } = Upload

const UploadCSV = () => {
  const [authState, setAuthState] = useContext(AuthContext)

  const uploadProps = {
    name: "file",
    multiple: true,
    action: `${process.env.REACT_APP_BASE_URL}/api/v1/recipients/import`,
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
    headers: { Authorization: `Bearer ${authState.token}` },
  }

  return (
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
  )
}

UploadCSV.propTypes = {}

export default UploadCSV
