import { Layout, Divider, Rate } from "antd";
import { Router } from "../../../router/Router";

export const Content = () => {
  return (
    <Layout.Content
      style={{
        margin: "0 16px",
      }}
    >
      <Router />
      {/* <Rate
          defaultValue={2.5}
          allowHalf
          onChange={(value) => {
            console.log("check: ", value);
          }}
        /> */}
    </Layout.Content>
  );
};
