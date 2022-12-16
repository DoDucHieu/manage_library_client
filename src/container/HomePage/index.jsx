import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import TableData from "./TableData";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homePage">
      <Button
        onClick={() => {
          navigate("/add-book");
        }}
      >
        Add book
      </Button>
      <TableData />
    </div>
  );
};

export default HomePage;
