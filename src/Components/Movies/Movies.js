import React, { useState, useEffect, Fragment } from 'react';
import styles from './css/movies.module.css';
import axios from 'axios';
import { default as Movie } from './Media';
import MenuOfCanvas from '../Header/menuOfCanvas';
import { useParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
//import { v4 as uuidv4 } from 'uuid';  //maybe uninstall this

const Movies = () => {

    const params = useParams();

    const [ movies, setMovies ] = useState( {
        title: '',
        movieList: [],
        dates: { minimum: '', maximum: '' }
    } );

    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ maxPages, setMaxPages ] = useState( 0 );
    const [ hasMore, setHasMore ] = useState( true );

    useEffect( () => {
        const fetchMovies = async () => {

            try {
                let response = await axios.get( `/${ params.option }/movies/?page=${ 1 }` );
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

                setMaxPages( response.data.results.total_pages );
            }
            catch {
                console.log( 'error' )
            }
        }
        fetchMovies();
    }, [ params.option ] );

    const fetchMoreData = async () => {
        if ( currentPage > ( maxPages / 4 ) ) {
            setHasMore( false );
            return;
        }

        let nextPage = currentPage + 1;
        let response = await axios.get( `/${ params.option }/movies/?page=${ nextPage }` );

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

        const updatedMovieList = [ ...movies.movieList, ...response.data.results.results ];

        setMovies( {
            title: `${ params.option } movies`,
            movieList: updatedMovieList,
            dates: dates
        } );

        setCurrentPage( nextPage );
    }


    if ( movies.movieList.length === 0 ) {
        return <h2>...Loading please wait.</h2>
    }

    else {
        //only upcoming and nowplaying movies have dates
        //so only those need to be displayed.
        let dates = ( movies.title === 'upcoming movies' || movies.title === 'nowplaying movies' )
            ? <h6 className={ styles.dates }>{ movies.dates.minimum } - { movies.dates.maximum }</h6>
            : null;

        return (
            <Fragment>
                <MenuOfCanvas type='movies'/>

                <div className={ styles.mainContainer }>

                    <h2 className={ styles.title }>{ movies.title }</h2>
                    { dates }
                    <p style={ { color: 'lightgrey', fontSize: '11px' } }>Note: Ratings are besed from TMBD users.</p>

                    <div className={ styles.moviesContainer }>
                        <InfiniteScroll
                            dataLength={ movies.movieList.length } //This is important field to render the next data
                            next={ fetchMoreData }
                            hasMore={ hasMore }
                            loader={ <h4>Loading...</h4> }
                            endMessage={
                                <p style={ { textAlign: 'center' } }>
                                    <b>End of the line.</b>
                                </p> }>

                            {
                                movies.movieList.map( ( movie ) =>
                                    <Movie
                                        key={ movie.id }
                                        id={ movie.id }
                                        title={ movie.title }
                                        releaseDate={ movie.release_date }
                                        posterPath={ movie.poster_path }
                                        rating={ movie.vote_average }
                                        option={ params.option }
                                        type='movies'
                                    />
                                )
                            }
                        </InfiniteScroll>
                    </div>
                </div>
            </Fragment>
        )
    }


}

export default Movies;