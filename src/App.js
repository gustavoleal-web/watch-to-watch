import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NavBarMenu from './Components/Header/NavBar';
import NavigationHeader from './Components/Header/NavigationHeader';
import Movies from './Components/Movies/Movies';
import Shows from './Components/TV/Shows';
import AboutMovie from './Components/Movies/About';
import AboutTv from './Components/TV/About';
//import MenuOfCanvas from './Components/Header/menuOfCanvas';

const App = () => {
  return (
    <Router>
      <div>
        <main style={ { backgroundColor: 'rgb(180, 186, 210)' } }>
        
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
              <Fragment>
                <NavBarMenu type='movies' />
                <AboutMovie />
              </Fragment>
            </Route>

            <Route path='/shows/:showId'>
              <Fragment>
                <NavBarMenu type='tv' />
                <AboutTv />
              </Fragment>
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

// for the burger menu <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
