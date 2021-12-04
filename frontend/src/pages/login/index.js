import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import { Form, Input, Button, Checkbox, Typography } from "antd"
import styled from "styled-components"
import apiFetch from "../../lib/api-fetch"
import { AuthContext } from "../../global-state"

const Main = styled.div`
  width: 40%;
  margin: auto;
  padding-top: 30px;
`

const Login = () => {
  const { Title } = Typography
  const history = useHistory()
  const [authState, setAuthState] = useContext(AuthContext)

  const onFinish = (values) => {
    apiFetch({
      route: "login",
      method: "post",
      params: { email: values.email, password: values.password },
    }).then(({ status, data }) => {
      if (status === 200) {
        // get and store token
        setAuthState({ ...authState, token: data.token, user_id: data.user_id, name: data.name })
        history.push("/")
      }
    })
  }

  return (
    <Main>
      <Title level={3}>Login</Title>
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

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" id="login-button">
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/register" id="register-link">
            Create A New Account
          </Link>
          <br />
          <Link to="/login/reset" id="reset-link">
            Forget your password?
          </Link>
        </Form.Item>
      </Form>
    </Main>
  )
}

export default Login
