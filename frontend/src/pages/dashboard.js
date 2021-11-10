import { useEffect, useState } from "react"
import { Table, Space, message, Button } from "antd"
import { Link } from "react-router-dom"
import apiFetch from "../lib/api-fetch"
import TemplateIndex from "./templates"

const getCampaignTableData = (data) =>
  data?.map(({ id, attributes: { name, tag, user_id: userId, template_id: templateId } }) => ({
    key: id,
    id,
    name,
    tag,
    userId,
    templateId,
  }))

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    apiFetch({ route: "campaigns" }).then(({ data }) => {
      setCampaigns(data)
    })
  }, [])

  const handleDeleteCampaign = (record) => {
    apiFetch({ route: `campaigns/${record.id}`, method: "delete" })
    setCampaigns(campaigns.filter((item) => item.id !== record.id))
    message.success("Campaign deleted!", 5)
  }

  const handleSendEmail = (record) => {
    apiFetch({ route: `campaigns/${record.id}/deliver`, method: "post" })
    message.success("Email sent!", 5)
  }

  const campaignsTable = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Link to={`/campaigns/${record.id}`}>{text}</Link>,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            id={`send email ${record.name}`}
            size="small"
            onClick={() => handleSendEmail(record)}
          >
            Send
          </Button>
          <Button
            id={`delete email ${record.name}`}
            size="small"
            onClick={() => handleDeleteCampaign(record)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <TemplateIndex />

      <h2>Campaigns</h2>
      <Table dataSource={getCampaignTableData(campaigns)} columns={campaignsTable} />
    </div>
  )
}

export default Dashboard
