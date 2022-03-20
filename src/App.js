import React from 'react'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Movies from './Components/Movies/Movies';
import Shows from './Components/TV/Shows';
import AboutMovie from './Components/Movies/About';
import AboutTv from './Components/TV/About';
import SeasonDetails from './Components/TV/SeasonDetails';
import SearchedMedia from './Components/Movies/SearchedMedia';
import SelectedGenre from './Components/Movies/SelectedGenre';
import CustomSearchResults from './Components/Movies/CutomSearchResults';
import dbLogo from './Images/the_movie_db_logo.svg';
import styles from './app.module.css';

const App = () => {
  return (
    <div>
      <div>
        <main className={ styles.main }>

          <Routes>

            <Route path='/:type/genre/:genreOption/:genreId'
              element={ <SelectedGenre /> } />

            <Route path='/:type/year/:releaseYear/genre/:genre/language/:language/rating/:rating'
              element={ <CustomSearchResults /> } />

            <Route path='/:type/search/:searchName'
              element={ <SearchedMedia /> } />

            <Route path='/movies/:navOption/:movieId'
              element={ <AboutMovie /> } />

            <Route path='/shows/:showId/season/:seasonNumber/of/:numberOfSeasons'
              element={ <SeasonDetails /> } />

            <Route path='/shows/:navOption/:showId'
              element={ <AboutTv /> } />

            <Route path='/movies/:option'
              element={ <Movies /> } />

            <Route path='/shows/:option'
              element={ <Shows /> } />

            <Route path='*'
              element={ <Navigate to="/movies/trending" /> } />

          </Routes>

          <div className={ styles.creditContainer }>
            <img src={ dbLogo } alt='the movie db logo' />
            <p>
              This product uses the TMDB API but is not endorsed or certified by TMDB
            </p>
          </div>

        </main>

      </div>
    </div>
  );
}

export default App;

// for the burger menu <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
