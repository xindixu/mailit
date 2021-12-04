import { useHistory } from "react-router-dom"
import { Form, Input, Button, Typography, message } from "antd"
import styled from "styled-components"
import apiFetch from "../../lib/api-fetch"

const Main = styled.div`
  width: 40%;
  margin: auto;
  padding-top: 30px;
`

const ResetPassEmail = () => {
  const { Title } = Typography
  const history = useHistory()

  const onFinish = (values) => {
    apiFetch({
      route: "password/forgot",
      method: "post",
      params: { email: values.email },
    }).then(({ status }) => {
      if (status === 200) {
        message.success("Email for reset password was sent!", 5)
        history.push("/login")
      }
    })
  }

  return (
    <Main>
      <Title level={3}>Please input your account&apos;s email</Title>
      <br />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" id="submit-email-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Main>
  )
}

export default ResetPassEmail
