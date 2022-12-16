import { actionType } from "../action/actionType";

const initialState = {
  email: "",
  accessToken: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
      };
    case actionType.LOG_OUT:
      return {
        ...state,
        email: "",
        accessToken: "",
      };

    default:
      return state;
  }
};
