import React, { Dispatch, useContext } from 'react';

export enum CONSTANTS {
  TOGGLE_CHECKED_ITEM = 0,
  RESET_CHECKED_ITEMS = 1,
  CHANGE_PAGE_SIZE = 2,
  CHANGE_PAGE_NUMBER = 3,
}

export interface IAppState {
  checkedList: object;
  pageSize: number;
  pageNumber: number;
}
export interface IAppActions {
  type: number;
  orgLogin?: string;
  pageSize?: number;
  pageNumber?: number;
}
export interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<IAppActions>;
}

const contextDefaultValue = {
  state: {
    checkedList: {},
    pageSize: 50,
    pageNumber: 1,
  },
  dispatch: () => {},
};

export const AppContext = React.createContext<IAppContext>(contextDefaultValue);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context ?? {};
};

const reducer = (state: IAppState, action: IAppActions) => {
  switch (action.type) {
    case CONSTANTS.TOGGLE_CHECKED_ITEM: {
      const newCheckedList = state.checkedList;
      if (newCheckedList[action.orgLogin]) {
        delete newCheckedList[action.orgLogin];
      } else newCheckedList[action.orgLogin] = true;
      localStorage.setItem('checkedList', JSON.stringify(newCheckedList));
      return { ...state, checkedList: newCheckedList };
    }
    case CONSTANTS.RESET_CHECKED_ITEMS: {
      localStorage.setItem('checkedList', '{}');
      return { ...state, checkedList: {} };
    }
    case CONSTANTS.CHANGE_PAGE_SIZE: {
      if (!isNaN(action.pageSize) && action.pageSize <= 100) {
        localStorage.setItem('pageSize', action.pageSize.toString());
        return { ...state, pageSize: action.pageSize };
      }
      return state;
    }
    case CONSTANTS.CHANGE_PAGE_NUMBER: {
      if (!isNaN(action.pageNumber)) {
        localStorage.setItem('pageNumber', action.pageNumber.toString());
        return { ...state, pageNumber: action.pageNumber };
      }
      return state;
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
};

export const AppContextProvider = ({ children }) => {
  const initialCheckedList = JSON.parse(localStorage.getItem('checkedList')) || {};
  const initialPageSize = JSON.parse(localStorage.getItem('pageSize')) || 50;
  const initialPageNumber = JSON.parse(localStorage.getItem('pageNumber')) || 1;

  const [state, dispatch] = React.useReducer(reducer, {
    checkedList: initialCheckedList,
    pageSize: initialPageSize,
    pageNumber: initialPageNumber,
  });

  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
