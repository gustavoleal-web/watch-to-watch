import React, { useState, useEffect, Fragment } from 'react';
import styles from './css/movies.module.css';
import axios from 'axios';
import Movie from './Movie';
import MenuOfCanvas from '../Header/menuOfCanvas';
import { useParams } from 'react-router';
// import { v4 as uuidv4 } from 'uuid';  maybe uninstall this

const Movies = () => {
    const [ searchName, setsearchName ] = useState( '' );
    const params = useParams();

    const [ movies, setMovies ] = useState( {
        title: '',
        movieList: [],
        dates: { minimum: '', maximum: '' }
    } );

    const [ currentPage, setCurrentPage ] = useState( 1 );

    const pages = [ 1, 2, 3, 4, 5 ];

    useEffect( () => {
        const fetchShows = async () => {
            try {
                let response = await axios.get( `/${ params.option }/movies/?page=${ currentPage }` );
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
                setMovies( {
                    title: `${ params.option } movies`,
                    movieList: response.data.results.results,
                    dates: dates
                } );
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchShows();
    }, [ params.option, currentPage ] );


    const onChangeHandler = ( e ) => {
        setsearchName( e.target.value );
    }

    const setNewPage = ( page ) => {
        if ( currentPage !== page ) {
            setCurrentPage( page )
        }
        window.scrollTo( 0, 0 );
    }

    const onClickHandler = async () => {
        if ( searchName.length >= 3 ) {
            let url = `/search/movies/?movieName=${ searchName }`;

            try {
                let response = await axios.get( url );
                setMovies( {
                    title: 'Results',
                    movieList: response.data.results.results,
                    dates: null
                } );

            }
            catch ( e ) {
                console.log( e )
            }
        }
    }


    const getMediaByGenre = async ( genreId, genreName ) => {

        try {
            let response = await axios.get( `/movies/byGenre?genreId=${ genreId }` );

            setMovies( {
                title: genreName,
                movieList: response.data.results.results,
                dates: null
            } );

        }
        catch ( e ) {
            console.log( e )
        }
    }

    if ( movies.movieList.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {
        //only upcoming and nowplayin have dates
        //without searchName.length === 0 it will give an error because dates will be undefined
        let dates = ( movies.title === 'upcoming movies' || movies.title === 'nowplaying movies' ) && searchName.length === 0
            ? <h6 className={ styles.dates }>{ movies.dates.minimum } - { movies.dates.maximum }</h6>
            : null;

        return (
            <Fragment>
                <MenuOfCanvas
                    type='movies'
                    onClickHandler={ onClickHandler }
                    onChangeHandler={ onChangeHandler }
                    searchName={ searchName }
                    getMediaByGenre={ getMediaByGenre } />

                <div className={ styles.mainContainer }>

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

                <div className={ styles.pageContainer }>
                    {
                        pages.map( page => {
                            if ( page === currentPage ) {
                                return <button key={ page } onClick={ () => setNewPage( page ) } className={ styles.selectedPage }>{ page }</button>
                            }
                            else return <button key={ page } onClick={ () => setNewPage( page ) } className={ styles.pages }>{ page }</button>

                        } )
                    }
                </div>

                <p style={ { color: 'lightgrey' } }>Note: Ratings are besed from TMBD users.</p>
            </Fragment>
        )
    }


}

export default Movies;