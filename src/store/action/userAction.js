import { actionType } from "./actionType";
import { userApi } from "../../api/userApi";

const signUp = (userInfor) => {
  return async (dispatch, getState) => {
    const res = await userApi.signUp(userInfor);
    dispatch({
      type: actionType.SIGN_UP_SUCCESS,
      payload: res.data,
    });
  };
};

const signIn = (userInfor) => {
  return async (dispatch, getState) => {
    const res = await userApi.signIn(userInfor);
    dispatch({
      type: actionType.SIGN_IN_SUCCESS,
      payload: res.data,
    });
  };
};

const signOut = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionType.SIGN_OUT,
    });
  };
};

export const userAction = {
  signUp,
  signIn,
  signOut,
};
