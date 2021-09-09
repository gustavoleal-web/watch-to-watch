import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NavBarMenu from './Components/Header/NavBar';
import NavigationHeader from './Components/Header/NavigationHeader';
import Movies from './Components/Body/Movies/Components/Movies';
import Shows from './Components/Body/TV/Components/Shows';
import AboutMovie from './Components/Body/Movies/Components/About';
import AboutTv from './Components/Body/TV/Components/About';

const App = () => {
  return (
    <Router>
      <div>
        <main>
          <Switch>

            <Route path='/' exact>
              <Redirect to='/movies' />

            </Route>

            <Route path='/movies' exact>
              <Fragment>
                <NavBarMenu type='movies' />
                <NavigationHeader />
                <Movies />
              </Fragment>

            </Route>

            <Route path='/movies/:movieId'>
              <AboutMovie />
            </Route>

            <Route path='/shows/:showId'>
              <AboutTv />
            </Route>


            <Route path='/shows'>
              <Fragment>
                <NavBarMenu type='tv' />
                <NavigationHeader />
                <Shows />

              </Fragment>


            </Route>

          </Switch>
        </main>

      </div>
    </Router>
  );
}

export default App;
