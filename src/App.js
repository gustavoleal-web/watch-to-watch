import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import NavigationHeader from './Header/NavigationHeader';
import Movies from './Trending/Movies/Movies';
import Shows from './Trending/TV/Shows';
import About from './Trending/Movies/Movie/About/About';

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
              <About />
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
