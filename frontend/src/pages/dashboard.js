import { useEffect, useState } from "react"
import { Card, Col, Row, Table, Popconfirm, Space } from "antd"
import { Link } from "react-router-dom"
import apiFetch from "../lib/api-fetch"
import TemplateIndex from "./templates"

const getCampaignTableData = (data) =>
  data.map(({ id, attributes: { name, tag, user_id: userId, template_id: templateId } }) => ({
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
  }

  const campaignsTable = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
          <Popconfirm
            title="Sure to Send?"
            onConfirm={() => apiFetch({ route: `campaigns/${record.id}/deliver`, method: "post" })}
          >
            <a>Send</a>
          </Popconfirm>
          <Popconfirm title="Sure to Delete?" onConfirm={() => handleDeleteCampaign(record)}>
            <a>Delete</a>
          </Popconfirm>
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
