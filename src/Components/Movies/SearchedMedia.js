import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Movie from '../Movies/Movie';
import styles  from '../Movies/css/movies.module.css';
import MenuOfCanvas from '../Header/menuOfCanvas';

const SearchedMedia = () => {
    const [ searchResults, setSearchResults ] = useState( {
        title: '',
        searchList: [],
    } )
    const params = useParams();
    console.log( params );

    useEffect( () => {
        const fetchMovies = async () => {
            if ( params.searchName.length >= 3 ) {
                //need to change this to `/search/mediaType/?searchName=${ params.searchName }
                //so it works with both shows and movies
                let url = `/search/movies/?movieName=${ params.searchName }`;

                try {
                    let response = await axios.get( url );
                    setSearchResults( { title: params.searchName, searchList: response.data.results.results } )
                    console.log( response.data.results.results );

                }
                catch ( e ) {
                    console.log( e )
                }
            }
        }
        fetchMovies();
    }, [ params.searchName ] );


    if ( searchResults.searchList.length > 0 ) {
        return (
            <Fragment>
            {/* type needs to be dynamic. either movies to shows  */}
                <MenuOfCanvas type='movies'/>

                <div className={ styles.mainContainer }>

                    <h2 className={ styles.title }>title</h2>

                    <div className={ styles.moviesContainer }>
                        {
                            searchResults.searchList.map( movie =>
                                <Movie
                                    title={ movie.title }
                                    releaseDate={ movie.release_date }
                                    posterPath={ movie.poster_path }
                                    rating={ movie.vote_average }
                                    key={ movie.id }
                                    movieId={ movie.id }
                                    option='trending' /> )
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
    else return null
}

export default SearchedMedia;