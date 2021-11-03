import { useEffect, useState } from "react"
import { Table } from "antd"
import apiFetch from "../lib/api-fetch"
import TemplateIndex from "./templates"

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
]

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

  return (
    <div>
      <TemplateIndex />

      <h2>Campaigns</h2>
      <Table dataSource={getCampaignTableData(campaigns)} columns={campaignsTable} />
    </div>
  )
}

export default Dashboard
