import { Button, Col, Form, Input, Row } from "antd";
import img from "../../asset/img/docker.jpeg";
import loginIcon from "../../asset/img/login.png";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/action/userAction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SignUp = () => {
  const [signUpForm] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAccessToken = useSelector((state) => state.userReducer.accessToken);
  useEffect(() => {
    userAccessToken && navigate("/");
  }, [userAccessToken]);

  const onFinish = async (values) => {
    try {
      await dispatch(userAction.signUp(values));
    } catch (e) {
      console.log(e);
    }
  };

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
          <h2 style={{ margin: 24, fontSize: 32 }}>Sign up</h2>
          <Form
            onFinish={onFinish}
            layout="vertical"
            style={{ width: "60%" }}
            form={signUpForm}
          >
            <Form.Item
              label="Username"
              name="userName"
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
                Sign up
              </Button>
            </Form.Item>
            <span
              style={{ color: "green", fontSize: 14, cursor: "pointer" }}
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Back to sign in!
            </span>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
