import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Card, Table } from "antd"
import apiFetch from "../lib/api-fetch"

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
  const [templates, setTemplates] = useState([])
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    apiFetch({ route: "templates" }).then(({ data }) => {
      setTemplates(data)
    })
    apiFetch({ route: "campaigns" }).then(({ data }) => {
      setCampaigns(data)
    })
  }, [])

  return (
    <div>
      <h2>Featured Templates</h2>
      {templates.map(({ id, attributes: { name } }) => (
        <Card key={id}>{name} </Card>
      ))}
      <h2>Campaigns</h2>
      <Table dataSource={getCampaignTableData(campaigns)} columns={campaignsTable} />
    </div>
  )
}

Dashboard.propTypes = {}

export default Dashboard
