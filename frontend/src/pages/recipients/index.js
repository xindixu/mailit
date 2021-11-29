import { Button, message, Table, Space } from "antd"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import apiFetch from "../../lib/api-fetch"

const upperStyle = {
  display: "inline-flex",
  width: "100%",
  justifyContent: "space-between",
}

const getRecipientsTableData = (data) =>
  data?.map(({ id, attributes: { email, tags, user_id: userId } }) => ({
    key: id,
    id,
    email,
    tags: tags.toString(),
    userId,
  }))

const Recipients = () => {
  const [recipients, setRecipients] = useState([])

  useEffect(() => {
    apiFetch({ route: "recipients" }).then(({ data }) => {
      setRecipients(data)
    })
  }, [])

  const handleDeleteRecipient = (record) => {
    apiFetch({ route: `recipients/${record.id}`, method: "delete" }).then(({ status }) => {
      if (status === 200) {
        setRecipients(recipients.filter((item) => item.id !== record.id))
        message.success("Recipient deleted!", 5)
      }
    })
  }

  const recipientsTable = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (text, record) => (
        <Space size="middle">
          <Button
            id={`delete recipient ${record.name}`}
            size="small"
            onClick={() => handleDeleteRecipient(record)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div style={upperStyle}>
        <h2>Recipients</h2>
        <Button type="primary">
          <Link to="/recipients/upload">Upload Recipients</Link>
        </Button>
      </div>
      <Table dataSource={getRecipientsTableData(recipients)} columns={recipientsTable} />
    </>
  )
}

export default Recipients
