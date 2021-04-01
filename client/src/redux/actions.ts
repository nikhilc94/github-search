import axios from 'axios';
import debounce from 'lodash/debounce';

import {
  SET_ERROR,
  SET_LOADER,
  ADD_USER_SEARCH_RESULT,
  ADD_REPO_SEARCH_RESULT,
} from './types';

const searchApiCall = debounce(
  async (type: string, text: string, dispatch: any, history: any) => {
    dispatch({ type: SET_LOADER });
    try {
      const resp = await axios.post('/api/search', { type, text });
      dispatch({
        type:
          type === 'users' ? ADD_USER_SEARCH_RESULT : ADD_REPO_SEARCH_RESULT,
        payload: { [text]: resp.data },
      });
      if (history) {
        history.push({ pathname: '/results' });
      }
    } catch (e) {
      dispatch({ type: SET_ERROR, payload: 'Service unavailable!' });
    }
  },
  750
);

export const searchGithub = (
  type: string,
  text: string,
  history: any
) => async (dispatch: any) => searchApiCall(type, text, dispatch, history);
