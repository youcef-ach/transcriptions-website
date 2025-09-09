import { useRef, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Form,
  Input,
  message,
  Result,
  Typography,
} from "antd";
import "./auth.css";
import { api } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

function test() {
  const myRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await api.post("/api/token/", {
        username: values.username,
        password: values.password,
      });
      localStorage.setItem("access-token", res.data.access);
      localStorage.setItem("refresh-token", res.data.refresh);
      message.success("success");
      setLoading(false);
      redirect("/");
    } catch {
      console.log("something went wrong");
      message.error("something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="authContainer">
        <Carousel
          className="carousel"
          speed={300}
          dots={false}
          infinite={false}
          ref={myRef}
        >
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
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
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
