import React, {useReducer} from 'react';
// import {data} from '../data';
import AppContext from './appContext';
import AppReducer from './appReducer';

import {SHOW_UPDATE_MODAL, SHOW_ADD_MODAL} from './types';

const AppState = props => {
  const initialState = {
    updateModal: false,
    addModal: false,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const openUpdateModal = val => {
    dispatch({
      type: SHOW_UPDATE_MODAL,
      payload: val,
    });
  };
  const openAddModal = val => {
    dispatch({
      type: SHOW_ADD_MODAL,
      payload: val,
    });
  };

  return (
    <AppContext.Provider
      value={{
        updateModal: state.updateModal,
        addModal: state.addModal,
        openUpdateModal,
        openAddModal,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
