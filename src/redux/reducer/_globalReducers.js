const initialState = {
    disableSearch: false,
  }
export const disableSearchReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "DISABLE_SEARCH":
        return {
            disableSearch: payload,
        };
      default:
        return state;
    }
  };
  