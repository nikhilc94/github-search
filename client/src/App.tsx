import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import './App.scss';
import HomePage from './pages/home';
import ResultPage from './pages/result';
import Loader from './components/loader';
import NotFoundPage from './pages/notFound';

const App = () => {
  return (
    <div className='App'>
      <Loader />
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/results'>
            <ResultPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
