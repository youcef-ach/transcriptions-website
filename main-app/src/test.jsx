import React, { useRef, useState } from "react";
import { Button, Card, Carousel, Form, Input, Typography, Flex } from "antd";

const { Title, Text, Link } = Typography;

function test() {
  const myRef = useRef(null);

  const containerStyles = {
    width: "45%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <>
      <div style={containerStyles}>
        <Carousel effect="scrollx" speed={300} dots={false} infinite={false} ref={myRef}>
          <div>
            <div
              style={{
                height: 594,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Card
                style={{
                  border: "20px solid rgba(54, 77, 121)",
                }}
                title={
                  <div style={{ textAlign: "center" }}>
                    <Title level={1} style={{ marginBottom: 10 }}>
                      TRANSCRIPTA
                    </Title>
                    <Text italic type="secondary">
                      ai based transcription system
                    </Text>
                  </div>
                }
              >
                <Form onFinish={values => console.log(values)}>
                  <Flex vertical>
                    <Title level={2} style={{ marginBottom: 30 }}>
                      LOGIN
                    </Title>
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
                  </Flex>
                </Form>
              </Card>
            </div>
          </div>
          <div>
            <div>
              <Card
                style={{
                  border: "20px solid rgba(54, 77, 121)",
                }}
                title={
                  <div style={{ textAlign: "center" }}>
                    <Title level={1} style={{ marginBottom: 10 }}>
                      TRANSCRIPTA
                    </Title>
                    <Text italic type="secondary">
                      ai based transcription system
                    </Text>
                  </div>
                }
              >
                <Form>
                  <Flex vertical gap={4}>
                    <Title level={2} style={{ marginBottom: 30 }}>
                      REGISTER
                    </Title>
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
                  </Flex>
                </Form>
              </Card>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
}
export default test;