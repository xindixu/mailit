import { useEffect, useState } from "react"
import { Card } from "antd"
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
      {templates.map(({ id, attributes: { name } }) => (
        <Card key={id}>{name} </Card>
      ))}
    </div>
  )
}

export default TemplateIndex
