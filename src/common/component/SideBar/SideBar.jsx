import libraryImg from "../../../asset/img/library.png";
import {
  ShoppingCartOutlined,
  FileOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../../store/action/userAction";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Trang chủ", "1", <HomeOutlined />),
  getItem("Giỏ hàng", "2", <ShoppingCartOutlined />),
  getItem("Tài khoản", "sub1", <UserOutlined />, [
    getItem("Information", "3"),
    getItem("Change password", "4"),
    getItem("History", "5"),
  ]),
  getItem("Thống kê", "9", <FileOutlined />),
];

export const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userReducer.userName);

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

  const handleSignOut = async () => {
    try {
      await dispatch(userAction.signOut());
    } catch (e) {
      console.log(e);
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
        <div className="user-infor">
          <img src={libraryImg} alt="" className="avatar" />
          <div className="infor">
            <label>{userName}</label>
            <label>Email@gmail.com</label>
          </div>
        </div>
        <div className="logout-icon">
          <LogoutOutlined
            style={{ color: "white", fontSize: 20, cursor: "pointer" }}
            onClick={() => {
              handleSignOut();
            }}
          />
        </div>
      </div>
    </Layout.Sider>
  );
};
