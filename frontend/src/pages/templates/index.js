import { useEffect, useCallback, useState } from "react"
import { Modal, Button, Card, Col, Row } from "antd"
import { Link } from "react-router-dom"
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import apiFetch from "../../lib/api-fetch"

const { confirm } = Modal
const showConfirm = ({ name, onOk, onCancel }) =>
  confirm({
    title: `Do you Want to delete template "${name}"`,
    icon: <ExclamationCircleOutlined />,
    onOk,
    onCancel,
  })

const TemplateIndex = () => {
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    apiFetch({ route: "templates" }).then(({ data }) => {
      setTemplates(data)
    })
  }, [])

  const onDelete = useCallback((id) => {
    apiFetch({ route: `templates/${id}`, method: "delete" }).then(({ status }) => {
      if (status === 200) {
        setTemplates((prevTemplates) => prevTemplates.filter((template) => template.id !== id))
      }
    })
  }, [])

  return (
    <>
      <h2>All Templates</h2>
      <Row gutter={16}>
        {templates.map(({ id, attributes: { name } }) => (
          <Col key={id} span={6}>
            <Card>
              <Link to={`/templates/${id}`}>
                <p>{name}</p>
              </Link>
              <Button
                shape="circle"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  showConfirm({ name, onOk: () => onDelete(id) })
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Button type="primary">
        <Link to="/templates/new">Create A Template</Link>
      </Button>
    </>
  )
}

export default TemplateIndex
