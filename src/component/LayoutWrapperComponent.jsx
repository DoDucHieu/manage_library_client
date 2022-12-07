import { Layout } from "antd";
import { SideBar } from "./SideBar/SideBar";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";

const LayoutWrapperComponent = () => {
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <SideBar />
      <Layout className="site-layout">
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
};
export default LayoutWrapperComponent;
