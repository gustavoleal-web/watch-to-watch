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
        movieList: [],
        dates: { minimum: '', maximum: '' }
    } );
    const [ searchName, setsearchName ] = useState( '' );
    const params = useParams();

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `/${ params.option }/movies` );
                let dates = {};
                if ( response.data.results.dates !== undefined ) {
                    let regex = /(\d{4})-(\d{1,2})-(\d{1,2})/;
                    let minimum = response.data.results.dates.minimum;
                    let maximum = response.data.results.dates.maximum;
                    let formatedMin = minimum.replace( regex, '$2/$3/$1' );
                    let formatedMax = maximum.replace( regex, '$2/$3/$1' );

                    dates.minimum = formatedMin;
                    dates.maximum = formatedMax;
                }
                setMovies( { title: `${ params.option } movies`, movieList: response.data.results.results, dates: dates } );
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
                setMovies( { title: 'Results', movieList: response.data.results.results } );

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
        //top rated movies have already been released so they dont need a time frame.
        let dates = movies.title !== 'toprated movies'
            ? <h6 className={ styles.dates }>{ movies.dates.minimum } - { movies.dates.maximum }</h6>
            : null;

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
                    { dates }

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
                <p style={ { color: 'lightgrey' } }>Note: Ratings are besed from TMBD users.</p>
            </Fragment>
        )
    }


}

export default Movies;