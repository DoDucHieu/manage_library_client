import { actionType } from "../action/actionType";

const initialState = {
  userName: "",
  accessToken: "",
  refreshToken:""
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SIGN_UP_SUCCESS:
      return {
        ...state,
        userName: action.payload.userName,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case actionType.SIGN_IN_SUCCESS:
      return {
        ...state,
        userName: action.payload.userName,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case actionType.SIGN_OUT:
      return {
        ...state,
        userName: "",
        accessToken: "",
        refreshToken: "",
      };

    default:
      return state;
  }
};
