import React, { useRef } from "react";
import { Button, Card, Carousel, Form, Input, Typography } from "antd";
import "./pages/auth/auth.css";

const { Title, Text, Link } = Typography;

function test() {
  const myRef = useRef(null);

  return (
    <>
      <div className="authContainer">
        <Carousel speed={300} dots={false} infinite={false} ref={myRef}>
          <Card
            className="authCard"
            title={
              <div className="tCenter">
                <Title style={{ margin: 0 }} level={1}>
                  TRANSCRIPTA
                </Title>
                <Text italic type="secondary">
                  ai based transcription system
                </Text>
              </div>
            }
          >
            <Form onFinish={(values) => console.log(values)}>
              <Title level={2}>LOGIN</Title>
              <Form.Item
                rules={[{ required: true, message: "required" }]}
                name="username"
                id="username"
                label="username"
              >
                <Input placeholder="username" />
              </Form.Item>
              <Form.Item
                name="password"
                id="password"
                label="password"
                rules={[{ required: true, message: "required" }]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" block>
                  submit
                </Button>
              </Form.Item>
              <Link onClick={() => myRef.current.goTo(1)}>
                you don't have an account? register for free!
              </Link>
            </Form>
          </Card>
          <Card
            className="authCard"
            title={
              <div className="tCenter">
                <Title level={1} style={{ margin: 0 }}>
                  TRANSCRIPTA
                </Title>
                <Text italic type="secondary">
                  ai based transcription system
                </Text>
              </div>
            }
          >
            <Form>
              <Title level={2}>REGISTER</Title>
              <Form.Item
                rules={[{ required: true, message: "required" }]}
                name="first_name"
                id="first_name"
                label="first_name"
              >
                <Input placeholder="first name" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "required" }]}
                name="last_name"
                id="last_name"
                label="last_name"
              >
                <Input placeholder="last_name" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "required" }]}
                name="registerusername"
                id="registerusername"
                label="username"
              >
                <Input placeholder="username" />
              </Form.Item>
              <Form.Item
                name="registerpassword"
                id="registerpassword"
                label="password"
                rules={[{ required: true, message: "required" }]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>
              <Form.Item
                name="registerpassword2"
                id="registerpassword2"
                label="confirm password"
                rules={[{ required: true, message: "required" }]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" block>
                  submit
                </Button>
              </Form.Item>
              <Link onClick={() => myRef.current.goTo(0)}>
                already have an account? sign in!
              </Link>
            </Form>
          </Card>
        </Carousel>
      </div>
    </>
  );
}
export default test;
