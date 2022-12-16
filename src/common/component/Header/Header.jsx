import { Breadcrumb } from "antd";
import { Layout } from "antd";

export const Header = () => {
  return (
    <>
      <Layout.Header
        style={{
          padding: 0,
          display: "flex",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.2)",
          height: 80,
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px",
          }}
        >
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
      </Layout.Header>
    </>
  );
};
