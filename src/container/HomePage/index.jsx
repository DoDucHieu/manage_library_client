import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons"
import TableData from "./TableData";

import "../../asset/style/homePage/HomePage.scss"

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homePage">
      <div className="addBook-btn">
        <Button
          type="primary"
          style={{marginBottom:16}}
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

export default HomePage;
