import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Card, Form, Button } from "antd"
import { PlusSquareOutlined } from "@ant-design/icons"
import Csv from "../../components/csv"
import Selection from "../../components/selection"
import Setting from "../../components/setting"
import apiFetch from "../../lib/api-fetch"
import { AuthContext } from "../../global-state"

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

const Campaigns = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [templates, setTemplates] = useState([])
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0)
  const [authState, setAuthState] = useContext(AuthContext)

  useEffect(() => {
    form.setFieldsValue({
      name: "",
      subject: "",
      tags: [],
    })

    apiFetch({ route: "templates" }).then((res) => {
      const ts = res.data
      const data = ts.map((value, index) => ({
        id: value.id,
        name: value.attributes.name,
        key: index,
      }))
      setTemplates(data)
    })
  }, [])

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        // add select template before submit
        // Submit values
        const param = {
          name: values.name,
          subject: values.subject,
          user_id: authState.user_id,
          template_id: templates[selectedTemplateIndex].id,
          tags: values.tags,
        }
        apiFetch({ route: "campaigns", method: "post", params: param }).then(({ status }) => {
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
          id="create_campaign"
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={handleCreate}
          size="large"
          disabled={templates.length === 0}
        >
          Create Campaign
        </Button>
        <br />
        <a href={`${process.env.REACT_APP_BASE_URL}/api/v1/recipients/export`} download>
          Download CSV Template
        </a>
      </div>
    </div>
  )
}

export default Campaigns
