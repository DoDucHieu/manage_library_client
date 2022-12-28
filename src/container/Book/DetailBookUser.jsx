import { Button, Card, InputNumber, Rate } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookApi } from "../../api/bookApi";
import { ModalLoading } from "../../common/component/Modal/ModalLoading";
import "../../asset/style/book/DetailBookUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartApi } from "../../api/cartApi";
import { cartAction } from "../../store/action/cartAction";
import { Comment } from "./Comment";
import { Assessment } from "./Assessment";

export const DetailBookUser = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [detailBook, setDetailBook] = useState();
  const [quantity, setQuantity] = useState(1);
  const userName = useSelector((state) => state.userReducer.userName);
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetDetailBook(params.id);
  }, []);

  const handleGetDetailBook = async (id) => {
    try {
      setLoading(true);
      const res = await bookApi.getDetail(id);
      setDetailBook(res?.data?.book);
    } catch (e) {
      console.log("err: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeQuantity = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const data = {
        userName: userName,
        bookId: params.id,
        quantity: quantity,
        imgUrl: detailBook?.imgUrl,
        title: detailBook?.title,
        author: detailBook?.author,
        price: detailBook?.price,
      };
      await dispatch(cartAction.addToCart(data));
    } catch (e) {
      console.log("error: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <ModalLoading />}
      <div className="detailBookUser">
        <div className="bookInfor">
          <Card
            bordered={false}
            style={{
              width: "40%",
              height: 400,
              backgroundColor: "rgba(50,100,100,0.1)",
            }}
          >
            <img src={detailBook?.imgUrl} alt="" className="bookImg" />
          </Card>
          <div className="bookDetailInfor">
            <h3 className="title">{detailBook?.title}</h3>
            <p className="author">{`Tác giả: ${detailBook?.author}`}</p>
            <Assessment userName={userName} bookId={params.id} />
            <p className="price">{`Đơn giá: ${detailBook?.price} VNĐ`}</p>
            <div className="quantity">
              <label>Số lượng mua:</label>
              <InputNumber
                className="inputNumber"
                min={1}
                defaultValue={1}
                onChange={handleChangeQuantity}
              />
            </div>
            <p className="totalCost">{`Thành tiền: ${
              detailBook?.price * quantity
            } VNĐ`}</p>
            <Button
              type="primary"
              style={{ width: "100%", height: 40, marginTop: 80 }}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="bookComment">
          <Comment userName={userName} bookId={params.id} />
        </div>
      </div>
    </>
  );
};
