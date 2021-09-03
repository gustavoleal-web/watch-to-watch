import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import NavigationHeader from './Components/Header/NavigationHeader';
import Movies from './Components/Body/Movies/Components/Movies';
import Shows from './Components/Body/TV/Components/Shows';
import AboutMovie from './Components/Body/Movies/Components/About';
import AboutTv from './Components/Body/TV/Components/About';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationHeader />

        <main>
          <Switch>

            <Route path='/' exact>
              <Redirect to='/movies' />

            </Route>

            <Route path='/movies' exact>
              <Movies />
            </Route>


            <Route path='/movies/:movieId'>
              <AboutMovie />
            </Route>


            <Route path='/shows/:showId'>
              <AboutTv />
            </Route>


            <Route path='/shows'>
              <Shows />
            </Route>

          </Switch>
        </main>

      </div>
    </Router>
  );
}

export default App;
