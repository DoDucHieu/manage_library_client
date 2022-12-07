import { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Home", "1", <PieChartOutlined />),
  getItem("Cart", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Information", "3"),
    getItem("Change password", "4"),
    getItem("History", "5"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={(value) => {
          console.log("check: ", value);
        }}
      />
    </Layout.Sider>
  );
};
