import { useEffect, useCallback, useState } from "react"
import { Modal, Button, Card, Col, Row } from "antd"
import { Link } from "react-router-dom"
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import styled from "styled-components"
import apiFetch from "../../lib/api-fetch"
import styleSettings from "../../styles"

const { spacer } = styleSettings

// TODO: replace it with a css utility class libraries
const Wrapper = styled.div`
  margin-bottom: ${spacer};
`

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
      <Wrapper>
        <Row gutter={16}>
          {templates.map(({ id, attributes: { name } }) => (
            <Col key={id} span={6}>
              <Card>
                <p>
                  <Link to={`/templates/${id}`}>{name}</Link>
                </p>
                <Button
                  shape="circle"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    showConfirm({ name, onOk: () => onDelete(id) })
                  }}
                  id={`delete template ${name}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Wrapper>
      <Button type="primary">
        <Link to="/templates/new">Create A Template</Link>
      </Button>
    </>
  )
}

export default TemplateIndex
