import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { compose, createStore, applyMiddleware } from 'redux';

import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users', 'repositories'],
};

const persistedReducer = persistReducer<any, any>(persistConfig, reducer);

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

let persistor = persistStore(store);

export default { store, persistor };
