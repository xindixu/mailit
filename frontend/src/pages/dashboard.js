import { useEffect, useState } from "react"
import { Card, Col, Row, Table } from "antd"
import { Link } from "react-router-dom"
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

const gridStyle = {
  width: "25%",
  textAlign: "center",
}

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

      <Card title="">
        {templates.map(({ id, attributes: { name } }) => (
          <Col span={8}>
            <Link to={`/templates/${id}`}>
              <Card.Grid key={id} style={gridStyle}>
                {name}
              </Card.Grid>
            </Link>
          </Col>
        ))}
      </Card>

      <h2>Campaigns</h2>
      <Table dataSource={getCampaignTableData(campaigns)} columns={campaignsTable} />
    </div>
  )
}

export default Dashboard
