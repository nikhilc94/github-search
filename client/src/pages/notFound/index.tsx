import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './index.scss';
import logo from '../../assets/github.png';
import ImageCard from '../../components/imageCard';

const NotFoundPage = () => {
  const history = useHistory();
  const handleHomePageRedirect = () => history.push({ pathname: '/' });

  return (
    <div className='not-found'>
      <ImageCard
        logo={logo}
        title='GitHub Searcher'
        content='Search users or repositories below'
        onImageClick={handleHomePageRedirect}
      />
      <h3>
        Page not found. Go{' '}
        <Link to='/' className='link'>
          Home
        </Link>
      </h3>
    </div>
  );
};

export default NotFoundPage;
