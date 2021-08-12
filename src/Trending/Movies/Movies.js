import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie/Movie';

const Movies = () => {
    const [ movies, setMovies ] = useState( [] )

    useEffect( () => {
        const fetchShows = async () => {
            let url = `http://localhost:3001/trending`;

            try {
                let response = await axios.get( url );
                setMovies(  response.data.results.results  )
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [] );

    if ( movies.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {

        return (
            <div>
                <h2>Trending Movies</h2>
                { movies.map( movie => <Movie title={ movie.title } releaseDate={ movie.release_date } posterPath={ movie.poster_path } key={ movie.id } id={movie.id}/> ) }
            </div>
        )
    }


}

export default Movies;