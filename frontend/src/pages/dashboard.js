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

      <Row gutter={16}>
        {templates.map(({ id, attributes: { name } }) => (
          <Col key={id} span={6}>
            <Link to={`/templates/${id}`}>
              <Card style={{}}>
                <p>{name}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <h2>Campaigns</h2>
      <Table dataSource={getCampaignTableData(campaigns)} columns={campaignsTable} />
    </div>
  )
}

export default Dashboard
