import React, { useRef, useState } from "react";
import { Button, Card, Carousel, Form, Input, message, Typography } from "antd";
import "./auth.css";
import { api } from "../../hooks/useApi.js";

const { Title, Text, Link } = Typography;

function test() {
  const myRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // result = api.post("/auth/token", {
      //   ...values,
      // });
      // if (result.access && result.refrsh) {
        localStorage.setItem(
          "access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1NzAyOTcyNywiaWF0IjoxNzU2OTQzMzI3LCJqdGkiOiI0MGQxZDAwYTQ4MmU0MjQ5YjU1MWY4MmU3MGVkZmY5NyIsInVzZXJfaWQiOjEyfQ.5pT0E-7XbVIb0QMdBCR0HAzEUMwZnCMJ3frZYzIS0k8"
        );
        localStorage.setItem(
          "refresh-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2OTQzNjI3LCJpYXQiOjE3NTY5NDMzMjcsImp0aSI6IjI5ODhkYTIxOTg2MjRkMDZhNDAzMjE2ODFiYTkwNGFiIiwidXNlcl9pZCI6MTJ9.5hqEktxx0Ne7eXwoFvilceHeKYprOq9Lykrkx3wrdz8"
        );
        message.success("logged in");
      // } else throw new Error("something wrong");
    } catch {
      console.log("something went wrong");
      message.error("something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="authContainer">
        <Carousel className="carousel" speed={300} dots={false} infinite={false} ref={myRef}>
          <div className="authCard authCard1">
            <div className="tCenter">
              <Title style={{ margin: 0 }} level={1}>
                TRANSCRIPTA
              </Title>
              <Text italic type="secondary">
                ai based transcription system
              </Text>
            </div>
            <Form onFinish={handleLogin}>
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
              <Form.Item wrapperCol={{ span: 24 }} className="noMargPad">
                <Button type="primary" htmlType="submit" block>
                  submit
                </Button>
              </Form.Item>
              <Link
                onClick={() => myRef.current.goTo(1)}
                style={{ display: "block", marginTop: 5 }}
              >
                you don't have an account? register for free!
              </Link>
            </Form>
          </div>
          <div className="authCard">
            <div className="tCenter">
              <Title level={1} style={{ margin: 0 }}>
                TRANSCRIPTA
              </Title>
              <Text italic type="secondary">
                ai based transcription system
              </Text>
            </div>
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
              <Form.Item wrapperCol={{ span: 24 }} className="noMargPad">
                <Button type="primary" htmlType="submit" block>
                  submit
                </Button>
              </Form.Item>
              <Link
                style={{ display: "block", marginTop: 5 }}
                onClick={() => myRef.current.goTo(0)}
              >
                already have an account? sign in!
              </Link>
            </Form>
          </div>
        </Carousel>
      </div>
    </>
  );
}
export default test;
