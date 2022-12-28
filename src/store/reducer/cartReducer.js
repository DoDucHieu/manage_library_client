import { actionType } from "../action/actionType";

const initialState = {
  listBooks: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_CART:
      return {
        ...state,
        listBooks: [...action.payload],
      };
    case actionType.ADD_TO_CART:
      return {
        ...state,
        listBooks: [...action.payload],
      };
    case actionType.REMOVE_FROM_CART:
      return {
        ...state,
        listBooks: [...action.payload],
      };
    default:
      return state;
  }
};
