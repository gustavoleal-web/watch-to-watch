import React, { useState, useEffect } from 'react';
import styles from './css/movies.module.css'
import axios from 'axios';
import Movie from './Movie/Movie';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
// import { v4 as uuidv4 } from 'uuid';  maybe uninstall this


const Movies = () => {
    const [ movies, setMovies ] = useState( [] );

    useEffect( () => {
        const fetchShows = async () => {
            let url = `http://localhost:3001/trending`;

            try {
                let response = await axios.get( url );
                setMovies( response.data.results.results )
                console.log()
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [] );

    const onChangeHandler = ( e ) => {
        console.log( e.target.value )
    }

    if ( movies.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {

        return (
            <div>

                <InputGroup  className={ styles.search }>
                    <FormControl
                        placeholder='Search movies'
                        aria-label='Search movies'
                        aria-describedby="basic-addon2"
                        onChange={ onChangeHandler }
                    />
                    <Button variant='outline-secondary' id='button-addon2'>
                        Button
                    </Button>
                </InputGroup>

                <h2>Trending Movies</h2>
                {
                    movies.map( movie =>
                        <Movie
                            title={ movie.title }
                            releaseDate={ movie.release_date }
                            posterPath={ movie.poster_path }
                            key={ movie.id }
                            movieId={ movie.id } /> )
                }
            </div>
        )
    }


}

export default Movies;