import * as actionTypes from './actions';

export const takePicture = picture => {
    return {
      type: actionTypes.TAKE_PICTURE,
      picture
    };
  };