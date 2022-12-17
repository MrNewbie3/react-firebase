const initialState = {
  popup: false,
  isLogin: false,
  isLoading: false,
  user: "Undefined",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_POPUP":
      return {
        ...state,
        popup: action.value,
      };
    case "CHANGE_LOGIN":
      return {
        ...state,
        isLogin: action.value,
      };
    case "CHANGE_USER":
      return {
        ...state,
        user: action.value,
      };
    case "CHANGE_LOADING":
      return {
        ...state,
        isLoading: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
