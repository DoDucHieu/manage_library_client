import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import moment from "moment";
import CONSTANT from "../../common/constant";
import "../../asset/style/homePageUser/HomePageUser.scss";
import { bookApi } from "../../api/bookApi";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export const HomePageUser = () => {
  const navigate = useNavigate();
  const [listBook, setListBook] = useState([]);

  const formatListBook = (data) => {
    const arr = data.map((item) => {
      return {
        ...item,
        datePublish: moment(item.datePublish).format(CONSTANT.FORMAT_DATE),
      };
    });
    return arr;
  };

  const handleGetAllBook = async () => {
    try {
      const res = await bookApi.getAll();
      const data = formatListBook(res?.data?.listBook);
      setListBook(data);
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleGetDetailBook = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    handleGetAllBook();
  }, []);
  return (
    <>
      <Card bordered={false} className="homePageUser">
        <Row
          gutter={16}
          style={{
            flexWrap: "wrap",
          }}
        >
          {listBook &&
            listBook.length > 0 &&
            listBook.map((item, index) => {
              return (
                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: 16 }}
                >
                  <Card
                    hoverable
                    style={{
                      width: "100%",
                      height: 300,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    cover={
                      <img
                        alt="example"
                        src={item?.imgUrl}
                        style={{
                          width: 200,
                          height: 200,
                          objectFit: "cover",
                          marginBottom: 8,
                        }}
                      />
                    }
                    onClick={() => handleGetDetailBook(item?._id)}
                  >
                    <Meta title={item?.title} description={item?.author} />
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Card>
    </>
  );
};
