import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import ResultItem from '../resultItem';
import { numberWithCommas } from '../../utils';

import './index.scss';

interface SearchResultProps {}

const SearchResult: FC<SearchResultProps> = () => {
  const state = useSelector((state: any) => state);

  const { searchText, searchType } = state;

  const result = state[searchType]?.[searchText];
  const resultsItems = result?.items;
  const totalCount = result?.total_count;

  return resultsItems ? (
    <div className='search-result'>
      {totalCount > 0 ? (
        <h3 className='summary'>{`Showing top ${
          resultsItems.length
        } of ${numberWithCommas(totalCount)} ${searchType}:`}</h3>
      ) : (
        <h3 className='summary'>No results found!</h3>
      )}
      {resultsItems.map((data: any) => (
        <div key={data.html_url} className='col-layout'>
          <ResultItem type={searchType} userData={data} />
        </div>
      ))}
    </div>
  ) : null;
};

export default SearchResult;
