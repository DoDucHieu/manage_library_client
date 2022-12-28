import { actionType } from "../action/actionType";

const initialState = {
  userName: "",
  role: "",
  accessToken: "",
  refreshToken: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SIGN_UP_SUCCESS:
      return {
        ...state,
        userName: action.payload.userInfor.userName,
        role: action.payload.userInfor.role,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case actionType.SIGN_IN_SUCCESS:
      return {
        ...state,
        userName: action.payload.userName,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case actionType.SIGN_OUT:
      return {
        ...state,
        userName: "",
        role: "",
        accessToken: "",
        refreshToken: "",
      };

    default:
      return state;
  }
};
