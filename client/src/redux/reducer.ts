import {
  SET_ERROR,
  SET_LOADER,
  ADD_SEARCH_TEXT,
  ADD_SEARCH_TYPE,
  ADD_USER_SEARCH_RESULT,
  ADD_REPO_SEARCH_RESULT,
} from './types';

const initialState = {
  error: '',
  loading: false,
  searchText: '',
  searchType: 'users',
  users: {},
  repositories: {},
};

type actionType = {
  type: string;
  payload: any;
};

const reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_LOADER:
      return {
        ...state,
        loading: true,
      };

    case ADD_SEARCH_TEXT:
      return {
        ...state,
        error: '',
        searchText: action.payload,
      };

    case ADD_SEARCH_TYPE:
      return {
        ...state,
        error: '',
        searchType: action.payload,
      };

    case ADD_USER_SEARCH_RESULT:
      return {
        ...state,
        error: '',
        loading: false,
        users: {
          ...state.users,
          ...action.payload,
        },
      };

    case ADD_REPO_SEARCH_RESULT:
      return {
        ...state,
        error: '',
        loading: false,
        repositories: {
          ...state.repositories,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
