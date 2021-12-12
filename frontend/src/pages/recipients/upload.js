import { Card, Form, Input, Button, message } from "antd"
import { useEffect, useContext } from "react"
import Csv from "../../components/csv"
import TagsFormItem from "../../components/setting/tags"
import apiFetch from "../../lib/api-fetch"
import { AuthContext } from "../../global-state"

const mainStyle = {
  width: "100%",
  display: "inline-flex",
}

const sectionStyle = {
  isplay: "inline-block",
  width: "50%",
  marginBottom: "20px",
  padding: "10px",
}

const RecipientsUpload = () => {
  const [form] = Form.useForm()
  const [authState, setAuthState] = useContext(AuthContext)

  useEffect(() => {
    form.setFieldsValue({
      firstname: "",
      lastname: "",
      email: "",
      tags: [],
    })
  }, [])

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // add select template before submit
        // Submit values
        const param = {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          user_id: authState.user_id,
          tags: values.tags,
        }
        apiFetch({ route: "recipients", method: "post", params: param }).then(({ status }) => {
          if (status === 200) {
            message.success("Recipient added!", 5)
          }
        })
      })
      .catch(() => {})
  }

  return (
    <>
      <div style={mainStyle}>
        <div style={sectionStyle}>
          <Csv />
        </div>
        <div style={sectionStyle}>
          <Card title="Add A Recipient">
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              size="default"
              form={form}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    types: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[{ required: true, message: "Please input first name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[{ required: true, message: "Please input last name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tags"
                name="tags"
                rules={[{ required: true, message: "Please input at least one tag!" }]}
              >
                <TagsFormItem />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="submit" type="primary" onClick={handleSubmit} id="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  )
}

export default RecipientsUpload
