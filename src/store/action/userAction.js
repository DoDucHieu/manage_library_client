import { actionType } from "./actionType";
import { userApi } from "../../api/userApi";

const login = (userInfor) => {
  return async (dispatch, getState) => {
    const res = await userApi.login(userInfor);
    dispatch({
      type: actionType.LOGIN_SUCCESS,
      payload: res.data,
    });
  };
};

const logout = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionType.LOG_OUT,
    });
  };
};

export const userAction = {
  login,
  logout,
};
