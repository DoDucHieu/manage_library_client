import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import TableData from "./TableData";
import "../../asset/style/homePage/HomePageAdmin.scss";

export const HomePageAdmin = () => {
  const navigate = useNavigate();
  return (
    <div className="homePageAdmin">
      <div className="addBook-btn">
        <Button
          type="primary"
          style={{ width: 150, height: 40, marginBottom: 24 }}
          onClick={() => {
            navigate("/add-book");
          }}
        >
          <PlusOutlined />
          Thêm sách
        </Button>
      </div>
      <TableData />
    </div>
  );
};
