import { Layout, Divider, Rate } from "antd";
import { Router } from "../../../router/Router";
import { useSelector } from "react-redux";


export const Content = () => {
  const userAccessToken = useSelector(
    (state) => state.userReducer.accessToken,
  );
  return (
    <Layout.Content
      style={{
        margin: userAccessToken? "0 24px": "0px",
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
