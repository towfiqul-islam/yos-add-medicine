import {SHOW_UPDATE_MODAL, SHOW_ADD_MODAL} from './types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;

    case SHOW_UPDATE_MODAL:
      return {
        ...state,
        updateModal: action.payload,
      };
    case SHOW_ADD_MODAL:
      return {
        ...state,
        addModal: action.payload,
      };
  }
};
