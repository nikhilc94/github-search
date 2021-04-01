import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.scss';

import App from './App';
import storeObj from './redux/store';

ReactDOM.render(
  <Provider store={storeObj.store}>
    <PersistGate loading={null} persistor={storeObj.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
