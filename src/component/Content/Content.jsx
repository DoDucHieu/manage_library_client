import { Layout, Divider, Rate } from "antd";
import { Router } from "../../router/Router";

export const Content = () => {
  return (
    <Layout.Content
      style={{
        margin: "0 16px",
      }}
    >
      <Divider style={{ marginBottom: 16, marginTop: 0 }} />
      <div
        style={{
          minHeight: 360,
        }}
      >
        <Router />
        <Rate
          defaultValue={2.5}
          allowHalf
          onChange={(value) => {
            console.log("check: ", value);
          }}
        />
      </div>
    </Layout.Content>
  );
};
