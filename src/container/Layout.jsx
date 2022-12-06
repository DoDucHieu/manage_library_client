import SideBar from "./Menu/SideBar";
import HomePage from "./HomePage/index";
import Header from "../component/Header/Header";
import "../asset/style/Layout/layout.scss";

export const Layout = () => {
  return (
    <div className="layout">
      <SideBar />
      <div className="layout_right">
        <div className="layout_right-header">
          <Header />
        </div>
        <div className="layout_right-body">
          <HomePage />
        </div>
      </div>
    </div>
  );
};
