import { Layout } from "antd";
import { SideBar } from "./SideBar/SideBar";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Footer } from "./Footer/Footer";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";


const LayoutWrapperComponent = () => {
  const location = useLocation();
  const userAccessToken = useSelector(
    (state) => state.userReducer.accessToken,
  ); 
  console.log("location: ", location.pathname);


  return (
    <>
      <Layout
        style={{
          height: "100vh",
        }}
        className="layoutWrapperComponent"
      >
        <ToastContainer />
        {userAccessToken&& <SideBar />}
        <Layout className="site-layout">
          {userAccessToken && <Header />}
          <Content />
          {/* {!userInfor?.isLoggedIn && <Footer />} */}
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutWrapperComponent;
