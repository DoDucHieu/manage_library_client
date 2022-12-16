import { Button, Col, Form, Input, Row } from "antd";
import img from "../../asset/img/docker.jpeg";
import loginIcon from "../../asset/img/login.png";
import { useLocation } from "react-router-dom";

export const SignIn = () => {
  const [loginForm] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const location = useLocation();
  console.log("location: ", location.pathname);
  return (
    <Row style={{ height: "100vh" }}>
      <Col span={12} style={{ background: "gray" }}>
        <img
          src={img}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Col>
      <Col span={12}>
        <div
          className="formLogin"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={loginIcon}
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              marginBottom: 24,
            }}
          />
          <h2 style={{ margin: 24, fontSize: 32 }}>Login</h2>
          <Form
            onFinish={onFinish}
            layout="vertical"
            style={{ width: "60%" }}
            form={loginForm}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginTop: 32 }}
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
