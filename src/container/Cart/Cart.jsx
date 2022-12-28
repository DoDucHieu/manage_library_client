import { Button, Card, InputNumber, Rate } from "antd";
import { useEffect, useState } from "react";
import { ModalLoading } from "../../common/component/Modal/ModalLoading";
import "../../asset/style/cart/Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/action/cartAction";

export const Cart = () => {
  const [loading, setLoading] = useState(false);
  const userName = useSelector((state) => state.userReducer.userName);
  const dispatch = useDispatch();
  const listBooks = useSelector((state) => state.cartReducer.listBooks);

  useEffect(() => {
    handleGetAllCart(userName);
  }, []);

  const handleGetAllCart = async (userName) => {
    try {
      setLoading(true);
      await dispatch(cartAction.getAllCart(userName));
    } catch (e) {
      console.log("err: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    try {
      setLoading(true);
      const data = {
        userName: userName,
        bookId: bookId,
      };
      await dispatch(cartAction.removeFromCart(data));
    } catch (e) {
      console.log("err: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <ModalLoading />}
      {listBooks &&
        listBooks.map((item, index) => {
          console.log(index);
          return (
            <div className="cart">
              <img src={item?.imgUrl} alt="" className="bookImg" />
              <div className="cart-right">
                <div className="bookDetailInfor">
                  <h3>{item?.title}</h3>
                  <p style={{ marginTop: 4 }}>{`Tác giả: ${item?.author}`}</p>
                  <p
                    style={{ marginTop: 4 }}
                  >{`Đơn giá: ${item?.price} VNĐ`}</p>
                  <p
                    style={{ marginTop: 4 }}
                  >{`Số lượng đặt: ${item?.quantity}`}</p>
                </div>
                <Button
                  type="primary"
                  onClick={() => {
                    handleRemoveFromCart(item.bookId);
                  }}
                >
                  Hủy đặt hàng
                </Button>
              </div>
            </div>
          );
        })}
    </>
  );
};
