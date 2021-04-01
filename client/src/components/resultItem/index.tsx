import React, { FC } from 'react';

import './index.scss';
import { kFormatter } from '../../utils';

interface ResultItemProps {
  type: 'users' | 'repositories';
  userData: any;
}

const ResultItem: FC<ResultItemProps> = ({ type, userData }) => {
  if (type === 'users') {
    const { login, html_url, avatar_url } = userData;
    return (
      <div className='card'>
        <img src={avatar_url} alt='user_avatar' />
        <h3 className='card-name'>{`@${login}`}</h3>
        <button onClick={() => window.open(html_url)}>View Profile</button>
      </div>
    );
  } else if (type === 'repositories') {
    const {
      name,
      forks,
      login,
      html_url,
      avatar_url,
      stargazers_count,
    } = userData;
    return (
      <div className='card'>
        <img src={avatar_url} alt='user_avatar' />
        <p className='login-name'>{`@${login}`}</p>
        <h3 className='card-name'>{name}</h3>
        <div className='stats'>
          <p>
            <i className='fas fa-star' />
            {kFormatter(stargazers_count)}
          </p>
          <p>
            <i className='fas fa-code-branch' />
            {kFormatter(forks)}
          </p>
        </div>
        <button onClick={() => window.open(html_url)}>View Repo</button>
      </div>
    );
  }
  return null;
};

export default ResultItem;
