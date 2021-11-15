import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Card, Form, Button } from "antd"
import { PlusSquareOutlined } from "@ant-design/icons"
import Csv from "../../components/csv"
import Selection from "../../components/selection"
import Setting from "../../components/setting"
import apiFetch from "../../lib/api-fetch"

const mainStyle = {
  width: "100%",
  display: "inline-flex",
}

const sectionStyle = {
  isplay: "inline-block",
  width: "33%",
  marginBottom: "20px",
  padding: "10px",
}

const bottomStyle = {
  display: "table",
  alignItems: "center",
  verticalAlign: "middle",
  margin: "auto",
}

const columns = [
  {
    title: "Template Name",
    dataIndex: "name",
  },
]

const CampaignShow = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [templates, setTemplates] = useState([])
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0)
  const user_id = sessionStorage.getItem("user_id")
  const { id } = useParams()

  useEffect(() => {
    apiFetch({ route: `campaigns/${id}` }).then(({ data }) => {
      form.setFieldsValue({
        name: data.attributes.name,
        tags: data.attributes.tags,
      })
      apiFetch({ route: "templates" }).then((res) => {
        const ts = res.data
        const tdata = ts.map((value, index) => ({
          id: value.id,
          name: value.attributes.name,
          key: index,
        }))

        setSelectedTemplateIndex(ts.findIndex((t) => t.id === `${data.attributes.template_id}`))
        setTemplates(tdata)
      })
    })
  }, [id])

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Submit values
        apiFetch({
          route: `campaigns/${id}`,
          method: "patch",
          params: { ...values, template_id: templates[selectedTemplateIndex].id, user_id },
        }).then(({ status }) => {
          if (status === 200) {
            history.push("/")
          }
        })
      })
      .catch(() => {})
  }

  return (
    <div>
      <div style={mainStyle}>
        <div style={sectionStyle}>
          <Card title="Choose A Template">
            <Selection
              selectedRowKeys={[selectedTemplateIndex]}
              setSelectedRowKeys={(array) => setSelectedTemplateIndex(array[0])}
              columns={columns}
              data={templates}
            />
          </Card>
        </div>
        <div style={sectionStyle}>
          <Csv />
        </div>
        <div style={sectionStyle}>
          <Card title="Setting">
            <Setting form={form} />
          </Card>
        </div>
      </div>
      <div style={bottomStyle}>
        <Button
          id="save_campaign"
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={handleSave}
          size="large"
          disabled={templates.length === 0}
        >
          Save Campaign
        </Button>
      </div>
    </div>
  )
}

export default CampaignShow
