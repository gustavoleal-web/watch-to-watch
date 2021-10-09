import React, { useState, useEffect, Fragment } from 'react';
import styles from './css/movies.module.css';
import axios from 'axios';
import Movie from './Movie';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl';
import NavBar from '../Header/NavBar';
import { useParams } from 'react-router';
// import { v4 as uuidv4 } from 'uuid';  maybe uninstall this

const Movies = () => {
    const [ movies, setMovies ] = useState( {
        title: '',
        movieList: []
    } );
    const [ searchName, setsearchName ] = useState( '' );
    const params = useParams();

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `/${ params.option }/movies` );
                setMovies( { title: `${ params.option } movies`, movieList: response.data.results.results } );

            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [ params.option ] );


    const onChangeHandler = ( e ) => {
        setsearchName( e.target.value );
    }

    const onClickHandler = async () => {
        if ( searchName.length > 3 ) {
            let url = `/search/movies/?movieName=${ searchName }`;

            try {
                let response = await axios.get( url );
                setMovies( { title: 'Results', movieList: response.data.results.results } )
            }
            catch ( e ) {
                console.log( e )
            }
        }
    }


    if ( movies.movieList.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {
        return (
            <Fragment>
                <NavBar type='movies' />
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

                    <h2 className={ styles.title }>{ movies.title }</h2>

                    <div className={ styles.moviesContainer }>
                        {
                            movies.movieList.map( movie =>
                                <Movie
                                    title={ movie.title }
                                    releaseDate={ movie.release_date }
                                    posterPath={ movie.poster_path }
                                    rating={ movie.vote_average }
                                    key={ movie.id }
                                    movieId={ movie.id }
                                    option={ params.option } /> )
                        }

                    </div>
                </div>
            </Fragment>
        )
    }


}

export default Movies;