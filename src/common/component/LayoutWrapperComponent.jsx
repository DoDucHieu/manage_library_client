import { Layout } from "antd";
import { SideBar } from "./SideBar/SideBar";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { useLocation } from "react-router-dom";
import helper from "../helper/helper";

const LayoutWrapperComponent = () => {
  const location = useLocation();
  const userInfor = helper.getUserInfor();
  console.log("location: ", location.pathname);
  return (
    <>
      <Layout
        style={{
          height: "100vh",
        }}
        className="layoutWrapperComponent"
      >
        {!userInfor?.isLoggedIn && <SideBar />}
        <Layout className="site-layout">
          {!userInfor?.isLoggedIn && <Header />}
          <Content />
          {/* {!userInfor?.isLoggedIn && <Footer />} */}
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutWrapperComponent;
