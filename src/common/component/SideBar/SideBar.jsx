import { useState } from "react";
import libraryImg from "../../../asset/img/library.png";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Trang chủ", "1", <PieChartOutlined />),
  getItem("Giỏ hàng", "2", <DesktopOutlined />),
  getItem("Tài khoản", "sub1", <UserOutlined />, [
    getItem("Information", "3"),
    getItem("Change password", "4"),
    getItem("History", "5"),
  ]),
  getItem("Thống kê", "9", <FileOutlined />),
];

export const SideBar = () => {
  const navigate = useNavigate();
  const handleNavigate = (key) => {
    switch (Number(key)) {
      case 1: {
        navigate("/");
        break;
      }
      case 2: {
        navigate("/cart");
        break;
      }
      default:
        break;
    }
  };
  return (
    <Layout.Sider>
      <div className="sidebar_logo">
        <img src={libraryImg} alt="" />
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        onClick={(value) => {
          console.log("check: ", value);
          handleNavigate(value?.key);
        }}
      />
      <div className="sidebar_login-logout">
        <Button
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Log out
        </Button>
      </div>
    </Layout.Sider>
  );
};
