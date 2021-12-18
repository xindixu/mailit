import D3Funnel from "d3-funnel"
import { useEffect, useState, useRef } from "react"
import { Card, Col, Row } from "antd"
import { Link } from "react-router-dom"
import styled from "styled-components"
import apiFetch from "../../lib/api-fetch"
import styleSettings from "../../styles"

const { spacer } = styleSettings

// TODO: replace it with a css utility class libraries
const Wrapper = styled.div`
  margin-bottom: ${spacer};
`

const PredefinedTemplates = () => {
  const [templates, setTemplates] = useState([])
  const dataRef = useRef(null)

  useEffect(() => {
    apiFetch({ route: "templates" }).then(({ data }) => {
      setTemplates(data)
    })
  }, [])

  return (
    <>
      <h2>Predefined Templates</h2>
      <Wrapper>
        <Row gutter={16}>
          {templates.map(({ id, attributes: { name } }) => (
            <Col key={id} span={6}>
              <Card>
                <p>
                  <Link to={`/predefined-templates/${id}`}>{name}</Link>
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Wrapper>
      <Card title="Templates Analytics">
        <div ref={dataRef} />
      </Card>
    </>
  )
}

export default PredefinedTemplates
