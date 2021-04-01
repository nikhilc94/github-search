import React from 'react';
import { useSelector } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';

import './index.scss';

const Loader = () => {
  const loading = useSelector((state: any) => state.loading);

  return loading ? (
    <div className='loader-bg'>
      <div className='loader'>
        <RingLoader color='#8c9aff' />
      </div>
    </div>
  ) : null;
};

export default Loader;
