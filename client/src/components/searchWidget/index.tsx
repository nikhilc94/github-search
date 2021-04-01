import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import './index.scss';
import logo from '../../assets/github.png';

import Input from '../input';
import Dropdown from '../dropdown';
import ImageCard from '../imageCard';
import { searchGithub } from '../../redux/actions';
import { ADD_SEARCH_TEXT, ADD_SEARCH_TYPE } from '../../redux/types';

interface SearchWidgetProps {}

const SearchWidget: FC<SearchWidgetProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  const { error, searchText, searchType } = state;

  useEffect(() => {
    if (searchText.length >= 3) {
      if (state[searchType].hasOwnProperty(searchText)) {
        history.push({ pathname: '/results' });
      } else {
        dispatch(searchGithub(searchType, searchText, history));
      }
    }
  }, [searchText, searchType]);

  const handleSearchTextChange = (val: string) =>
    dispatch({ type: ADD_SEARCH_TEXT, payload: val });

  const handleSearchTypeChange = (val: string) =>
    dispatch({ type: ADD_SEARCH_TYPE, payload: val });

  const handleHomePageRedirect = () => {
    dispatch({ type: ADD_SEARCH_TEXT, payload: '' });
    history.push({ pathname: '/' });
  };

  return (
    <div className='search-widget'>
      <ImageCard
        logo={logo}
        title='GitHub Searcher'
        content='Search users or repositories below'
        onImageClick={handleHomePageRedirect}
      />
      <Input
        autoFocus
        value={searchText}
        onInputChange={handleSearchTextChange}
        placeholder='Start typing to search...'
      />
      <Dropdown
        value={searchType}
        onOptionChange={handleSearchTypeChange}
        options={[
          { value: 'users', label: 'Users' },
          { value: 'repositories', label: 'Repositories' },
        ]}
      />
      {error && <h3 className='error'>{error}</h3>}
    </div>
  );
};

export default SearchWidget;
