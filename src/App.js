import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavigationHeader from './Header/NavigationHeader';
import Movies from './Trending/Movies/Movies';
import Shows from './Trending/TV/Shows';


const App = () => {
  return (
    <Router>
      <div>
        <NavigationHeader />

        <main>
          <Switch>
            <Route path='/shows'>
              <Shows />
            </Route>
            <Route path='/'>
              <Movies />
            </Route>
          </Switch>
        </main>

      </div>
    </Router>
  );
}

export default App;
