import { useEffect, useState } from "react"
import { Card, Col, Row } from "antd"
import { Link } from "react-router-dom"
import apiFetch from "../../lib/api-fetch"

const TemplateIndex = () => {
  const [templates, setTemplates] = useState([])
  useEffect(() => {
    apiFetch({ route: "templates" }).then(({ data }) => {
      setTemplates(data)
    })
  }, [])

  return (
    <div>
      <h2>All Templates</h2>
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
    </div>
  )
}

export default TemplateIndex
