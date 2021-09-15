import React, { useState, useEffect } from 'react';
import styles from '../CSS/movies.module.css';
import axios from 'axios';
import Movie from './Movie';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
// import { v4 as uuidv4 } from 'uuid';  maybe uninstall this


const Movies = () => {
    const [ movies, setMovies ] = useState( [] );
    const [ searchName, setsearchName ] = useState( '' )

    useEffect( () => {
        const fetchShows = async () => {
            let url = `http://localhost:3001/trending/movies`;

            try {
                let response = await axios.get( url );
                setMovies( response.data.results.results )
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [] );



    const onChangeHandler = ( e ) => {
        setsearchName( e.target.value );
    }

    const onClickHandler = async () => {
        if ( searchName.length > 3 ) {
            let url = `/search/movies/?movieName=${ searchName }`;

            try {
                let response = await axios.get( url );
                setMovies( response.data.results.results )
            }
            catch ( e ) {
                console.log( e )
            }

        }

    }

    if ( movies.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {

        return (
            <div className={ styles.mainContainer }>

                <InputGroup className={ styles.search }>
                    <FormControl
                        placeholder='Search movies'
                        aria-label='Search movies'
                        aria-describedby="basic-addon2"
                        value={ searchName }
                        onChange={ onChangeHandler }
                    />
                    <Button variant='outline-secondary' id='button-addon2' onClick={ onClickHandler }>
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