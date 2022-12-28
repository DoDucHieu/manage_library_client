import { cartApi } from "../../api/cartApi";
import { actionType } from "./actionType";

const getAllCart = (userName) => {
  return async (dispatch, getState) => {
    const res = await cartApi.getAll(userName);
    const arrData = res?.data?.data;
    const listBooks = arrData.map((book) => {
      return {
        bookId: book?.bookId?._id,
        quantity: book?.quantity,
        price: book?.bookId?.price,
        imgUrl: book.bookId?.imgUrl,
        bookName: book.bookId?.bookName,
        author: book.bookId?.author,
        title: book.bookId?.title,
      };
    });
    dispatch({
      type: actionType.GET_ALL_CART,
      payload: listBooks,
    });
  };
};

const addToCart = (data) => {
  return async (dispatch, getState) => {
    await cartApi.create(data);
    let arr = [...getState().cartReducer.listBooks];
    let checkExist = false;
    arr.forEach((book) => {
      if (book.bookId === data.bookId && book.quantity && data.quantity) {
        checkExist = true;
        book.quantity += data.quantity;
      }
    });
    if (!checkExist) {
      arr = [...arr, data];
    }
    dispatch({
      type: actionType.ADD_TO_CART,
      payload: arr,
    });
  };
};

const removeFromCart = (data) => {
  return async (dispatch, getState) => {
    await cartApi.delete({ data });
    const arr = getState().cartReducer.listBooks;
    const newArr = arr.filter((item) => {
      return item.bookId !== data.bookId;
    });
    dispatch({
      type: actionType.REMOVE_FROM_CART,
      payload: newArr,
    });
  };
};

export const cartAction = {
  getAllCart,
  addToCart,
  removeFromCart,
};
