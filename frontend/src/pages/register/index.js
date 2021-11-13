import React from "react"
import { useHistory } from "react-router-dom"
import { Form, Input, Button, Typography } from "antd"
import styled from "styled-components"
import apiFetch from "../../lib/api-fetch"

const Main = styled.div`
  width: 40%;
  margin: auto;
  padding-top: 30px;
`

const Register = () => {
  const { Title } = Typography
  const history = useHistory()

  const onFinish = (values) => {
    apiFetch({ route: "users", method: "post", params: {name: values.username, email: values.email, password: values.password} }).then((res) => {
      if (res.status === 200) {
        // get and store token
        console.log("Success:", res)

        history.push("/")
      }
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Main>
      <Title level={3}>Register</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          label="username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Main>
  )
}

export default Register
