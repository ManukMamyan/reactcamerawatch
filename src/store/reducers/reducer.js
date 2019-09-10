import * as actionTypes from '../actions/actions';

const initialState = {
  pictures: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TAKE_PICTURE:
      return {
        ...state,
        pictures: [...state.pictures, action.picture]
      };
    default:
      return state;
  }
};

export default reducer;
