import { Button, Col, Form, Input, Row } from "antd";
import img from "../../asset/img/docker.jpeg";
import loginIcon from "../../asset/img/login.png";

export const SignUp = () => {
  const [signUpForm] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Row>
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
          <h2 style={{ margin: 24, fontSize: 32 }}>Sign up</h2>
          <Form
            onFinish={onFinish}
            layout="vertical"
            style={{ width: "60%" }}
            form={signUpForm}
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
            <Form.Item
              label="Confirm passwords"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
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
