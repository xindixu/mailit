import { useHistory } from "react-router-dom"
import { Form, Input, Button, Typography, message } from "antd"
import styled from "styled-components"
import apiFetch from "../../lib/api-fetch"

const Main = styled.div`
  width: 40%;
  margin: auto;
  padding-top: 30px;
`

const ResetPassword = () => {
  const { Title } = Typography
  const history = useHistory()

  const onFinish = (values) => {
    message.success("Your password was reset!", 5)
    history.push("/login")
    // apiFetch({
    //   route: "login",
    //   method: "post",
    //   params: { email: values.email, password: values.password },
    // }).then(({ status, data }) => {
    //   if (status === 200) {
    //     // get and store token
    //     setAuthState({ ...authState, token: data.token, user_id: data.user_id, name: data.name })
    //     history.push("/")
    //   }
    // })
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
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"))
              },
            }),
          ]}
        >
          <Input.Password />
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

export default ResetPassword
